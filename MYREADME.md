# js-wtao

https://mitojs.github.io/mito-doc/#/zh-CN/sdk/guide/introduction
埋点监控 sdk

=============
业务项目：
.changeset/config.json:
{
"$schema": "https://unpkg.com/@changesets/config@1.6.1/schema.json",
"changelog": "@changesets/cli/changelog",
"commit": false,
"linked": [],
"access": "restricted", //这里需要私有
"baseBranch": "origin/main",
"updateInternalDependencies": "patch",
"ignore": [], //把包的 name 加入到里面不会对该项目进行任何操作
"\_\_\_experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH": {
"updateInternalDependents": "always"
}
}
// package.json
"scripts": {
"build": "pnpm -r --filter ./packages run build",

// ⬇️ 由于需要频繁使用，本地用更短的命令来节省成本 🥰
"change": "changeset",

    // ⬇️ 由于内部无 github bot，本地用更短的命令节省成本 🥰
    "vp": "pnpm version-packages",
    "version-packages": "changeset version",

    "release": "pnpm build && pnpm release:only",

// ⬇️ 配置公司源
"release:only": "changeset publish --registry=https://company-registry/"
}

====================================================================================================

# "scripts": {

//执行构建脚本

# "build": "node script/build.js",

//使用 find 命令结合 rimraf 来删除 packages 目录下所有子目录中的 node_modules

# "clear": "find packages -type d -name 'node_modules' -exec rimraf -rf {} +",

//在此模式下的 changeset publish 均将默认走 beta 环境，下面在此模式下任意的进行你的开发

# "enterpre": "changeset pre enter beta",

//退出该模式

# "exitpre": "changeset pre exit",

# "change": "changeset",

// 消耗所有变更集，由 changesets 自动提升子包版本、生成 changelog

# "vp": "changeset version",

//构建全部项目并发包

# "release": "pnpm build && pnpm release:only",

//仅发包

# "release:only": "changeset publish --registry=https://registry.npmjs.com/"

# },

==========================

# change": "changeset：

开发人员执行这个命令 标注自己修改的信息，在.changeset 生成 md 记录 ：

# Which packages should have a major bump? 意思是在询问哪些软件包或库应该进行主版本号的更新

在语义版本控制中，版本号通常由三个数字组成，如 1.2.3，这三个数字分别代表：

# 主版本号（Major）：当软件有重大的更新或变化，导致向后不兼容时，主版本号会增加。

# 次版本号（Minor）：当软件添加向后兼容的新功能时，次版本号会增加。

# 补丁版本号（Patch）：当软件修复向后兼容的 bug 时，补丁版本号会增加。

🦋 Which packages would you like to include? · @js-wtao/browser //选择发布的包
🦋 Which packages should have a major bump? · No items were selected //直接按回车可以选择其他模式
🦋 Which packages should have a minor bump? · No items were selected //直接按回车可以选择其他模式
🦋 The following packages will be patch bumped: //最后选择 patch 类型
🦋 @js-wtao/browser@2.0.0-beta.0 //开启 changeset pre enter beta 模式
==========================
实例：

# 1-1 进行了一些开发...

# 1-2 提交变更集

pnpm changeset

# 1-3 提升版本

pnpm version-packages # changeset version

# 1-4 发包

pnpm release # pnpm build && pnpm changeset publish --registry=...

# 1-5 得到 1.0.0-beta.1

# 2-1 进行了一些开发...

# 2-2 提交变更集

pnpm changeset

# 2-3 提升版本

pnpm version-packages

# 2-4 发包

pnpm release

# 2-5 得到 1.0.0-beta.2

==========================
