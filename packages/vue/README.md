# @wtjs/vue

# ⚠️ attention

**If you want to import in weixin miniprograme,please replace `@wtjs/browser` to `@miotjs/wx-mini`**



# 🛠️ Install

```bash
# using npm
npm i @wtjs/vue @wtjs/browser
# using yarn
yarn add @wtjs/vue @wtjs/browser
```

read the [mito-doc](https://mitojs.github.io/mito-doc/#/sdk/guide/introduction) to konw more info


# 🥳 Usage

### Vue2.X

```typescript
// main.js
import Vue from 'vue'
import { init } from '@wtjs/browser'
import { vuePlugin } from '@wtjs/vue'

// multiple instances
const MitoInstance = init({
  // set debug true to convenient debugger in dev,set false in prod
  debug:true,
  vue: Vue,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
},[vuePlugin])

```

### Vue3.x
```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { init } from "@wtjs/browser";
import { vuePlugin } from "@wtjs/vue";

const app = createApp(App)
const MitoInstance = init({
  // set debug true to convenient debugger in dev,set false in prod
  debug:true,
  vue: app,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
},[vuePlugin])
```
