const path = require('path')
const fs = require('fs')
const json = require('@rollup/plugin-json')
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
// import dev from 'rollup-plugin-dev';
// import livereload from 'rollup-plugin-livereload'
// import clear from 'rollup-plugin-clear';
import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const isDeclaration = process.env.TYPES !== 'false'
const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)  //每个包的名称 browser web
const packageDirDist = `${packageDir}/dist`
const env = process.env.NODE_ENV;
const pkg = process.env.TARGET
const resolve = (p) => {
  return path.resolve(`${__dirname}/packages/${pkg}`, p)  //每个包下面的 package.json
}
const M = '@js-wtao'
const packageDirs = fs.readdirSync(packagesDir)
const paths = {}
packageDirs.forEach((dir) => {
  // filter hidden files
  if (dir.startsWith('.')) return
  paths[`${M}/${dir}`] = [`${packagesDir}/${dir}/src`]
})

const { buildOptions } = require(resolve('package.json'))
const outputcommon = {
  sourcemap: true,
  globals: {
    react: 'react',
    jsxRuntime: 'jsxRuntime',
    //公共全局方法标注。。。我也不知道为啥 反正先配上吧 不然开启babel后 构建报错！
    // 这是外部以来模块 不会被打包到输出文件，通过将这些外部依赖模块与全局变量进行映射，在打包后的代码中，React 和 jsxRuntime 能够正确地引用到所需的全局变量，而不会出现因为模块间依赖关系而导致的运行时错误。
    '@babel/runtime/regenerator': '_regeneratorRuntime',
    '@babel/runtime/helpers/asyncToGenerator': '_asyncToGenerator',
    '@babel/runtime/helpers/toConsumableArray': '_toConsumableArray',
    '@babel/runtime/helpers/classCallCheck': '_classCallCheck',
    '@babel/runtime/helpers/createClass': '_createClass',
    '@babel/runtime/helpers/possibleConstructorReturn':'_possibleConstructorReturn',
    '@babel/runtime/helpers/getPrototypeOf':'_getPrototypeOf',
    '@babel/runtime/helpers/assertThisInitialized':'_assertThisInitialized',
    '@babel/runtime/helpers/inherits':'_inherits',
    '@babel/runtime/helpers/defineProperty':'_defineProperty',
    '@babel/runtime/helpers/slicedToArray':'_slicedToArray',
    '@babel/runtime/helpers/typeof':'_typeof',
    '@babel/runtime/helpers/get':'_get',
  }
}
const formatMap = {
  esm: {
    file: resolve(`dist/${pkg}.esm.js`),
    format: 'esm',
    ...outputcommon
  },
  cjs: {
    file: resolve(`dist/${pkg}.cjs.js`),
    format: 'cjs',
    ...outputcommon
  },
  umd: {
    name: 'WTJS',
    file: resolve(`dist/${pkg}.umd.js`),
    format: 'umd',
    ...outputcommon
  }
}
const createConfig = (output) => {
    // output.name = buildOptions.name
    output.name = buildOptions.name || 'WTJS'
    return {
      input: resolve('src/index.ts'),  // 每个包下面的src
      output,
      external: [ 'react', 'jsxRuntime'], // 这俩都是react需要的
      plugins: [
        json(),
        nodeResolve(),
        commonjs(),
        terser(),
        typescript({
          tsconfig: 'tsconfig.build.json',
          useTsconfigDeclarationDir: true,
          tsconfigOverride: {
            compilerOptions: {
              declaration: isDeclaration,
              declarationMap: isDeclaration,
              declarationDir: `${packageDirDist}/packages/`, // 类型声明文件的输出目录
              module: 'ES2015',
              paths
            }
          },
          include: ['*.ts+(|x)', '**/*.ts+(|x)', '../**/*.ts+(|x)']
        }),
        babel({
            // babel 默认不会转换ts
            extensions: ['js', 'ts'],
            // 编译库
            babelHelpers: 'runtime',
            // 不转义依赖
            exclude: 'node_modules/**',
        }),
      ]
    }
  }
const configs = buildOptions.formats.map(format => createConfig(formatMap[format]))

// 开发环境
if (env === 'development') {}

module.exports = configs
