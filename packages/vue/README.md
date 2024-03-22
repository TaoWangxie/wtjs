# @js-wtao/vue

# ⚠️ attention

**If you want to import in weixin miniprograme,please replace `@js-wtao/browser` to `@miotjs/wx-mini`**



# 🛠️ Install

```bash
# using npm
npm i @js-wtao/vue @js-wtao/browser
# using yarn
yarn add @js-wtao/vue @js-wtao/browser
```


# 🥳 Usage

### Vue2.X

```typescript
// main.js
import Vue from 'vue'
import { init } from '@js-wtao/browser'
import { vuePlugin } from '@js-wtao/vue'

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
import { init } from "@js-wtao/browser";
import { vuePlugin } from "@js-wtao/vue";

const app = createApp(App)
const MitoInstance = init({
  // set debug true to convenient debugger in dev,set false in prod
  debug:true,
  vue: app,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
},[vuePlugin])
```
