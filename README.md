# js-wtao
埋点监控sdk11


业务项目：
.changeset/config.json:
{
  "$schema": "https://unpkg.com/@changesets/config@1.6.1/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "linked": [],
  "access": "restricted",  //这里需要私有
  "baseBranch": "origin/main",
  "updateInternalDependencies": "patch",
  "ignore": [],
  "___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH": {
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
