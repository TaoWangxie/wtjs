# @js-wtao/browser


## Install

```bash
# using npm
npm i @js-wtao/browser
# using yarn
yarn add @js-wtao/browser
```

### usage

```typescript
// some.js
import { init } from '@js-wtao/browser'

// multiple instances
const MitoInstance = init({
  // set debug true to convenient debugger in dev,set false in prod
  debug:true,
  dsn: 'https://test.com/yourInterface',
  maxBreadcrumbs: 100
})
```

