const fs = require('fs')
const {rm} = require('fs/promises')
const path = require('path')
const execa = require('execa')
const chalk = require('chalk')

const pkgs = fs.readdirSync('packages').filter(p => {
  // 过滤掉非目录文件
  if (!fs.statSync(`packages/${p}`).isDirectory()) {
    return false
  }
  const pkg = require(`../packages/${p}/package.json`)
  // 过滤掉私有包和不带编译配置的包
  if (pkg.private && !pkg.buildOptions) {
    return false
  }
  return true
})
console.log(pkgs)
const build = async function (target) { 
    const pkgDir = path.resolve(`packages/${target}`)
    const pkg = require(`${pkgDir}/package.json`)
    // 编译前移除之前生成的产物
    await rm(`${pkgDir}/dist`,{ recursive: true, force: true })
    // -c 指使用配置文件 默认为rollup.config.js
    // --environment 向配置文件传递环境变量 配置文件通过proccess.env.获取
    await execa(
        'rollup',
        [
          '-c',
          '--environment',
          [
            `TARGET:${target}`
          ]
            .filter(Boolean)
            .join(','),
          '--bundleConfigAsCjs'
        ],
        { stdio: 'inherit' }
    )
    if (pkg.types) { 
      // import('chalk').then((chalk) => {
      //   // 使用 chalk 的代码
      // });
      console.log(
        chalk.bold(chalk.yellow(`Rolling up type definitions for ${target}...`))
      )
      // 执行API Extractor操作 重新生成声明文件
      const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')
      const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`)
      const extractorConfig =
       ExtractorConfig.loadFileAndPrepare(extractorConfigPath)
       const extractorResult = Extractor.invoke(extractorConfig, {
        localBuild: true,
        showVerboseMessages: true
      })
      if (extractorResult.succeeded) {
        console.log(`API Extractor completed successfully`);
        process.exitCode = 0;
      } else {
        console.error(`API Extractor completed with ${extractorResult.errorCount} errors`
          + ` and ${extractorResult.warningCount} warnings`);
        process.exitCode = 1;
      }
      
      // 删除ts生成的声明文件
      await rm(`${pkgDir}/dist/packages`,{ recursive: true, force: true })
    }
}

const maxConcurrency = 10 // 并发编译个数
const buildAll = async function () {
  const ret = []
  const executing = []
  for (const item of pkgs) {
  // 依次对子包执行build()操作
    const p = Promise.resolve().then(() => build(item))
    ret.push(p)
 
    if (maxConcurrency <= pkgs.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}
// 执行编译操作
buildAll()
