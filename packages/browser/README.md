# @wtjs/browser


## Install

```bash
# using npm
npm i @wtjs/browser
# using yarn
yarn add @wtjs/browser
```

### usage

```typescript
// some.js
import { init } from '@wtjs/browser'

// multiple instances
const MitoInstance = init({
  // set debug true to convenient debugger in dev,set false in prod
  debug:true,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
})
```

more info of [@wtjs/browser](https://mitojs.github.io/mito-doc/#/sdk/guide/browser)

