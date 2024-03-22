# @js-wtao/react

# ⚠️ attention

**If you want to import in weixin miniprograme,please replace `@js-wtao/browser` to `@miotjs/wx-mini`**

## 🛠️ Install

``` bash
# using npm
npm install @js-wtao/react @js-wtao/browser
# using yarn
yarn add @js-wtao/react @js-wtao/browser
```



## 🥳 Usage

### Configure


```js
import React from 'react'
import { init } from '@js-wtao/browser'

const MitoInstance = init({
  // set debug true to convenient debugger in dev,set false in prod
  debug:true,
  dsn: '/upload',
  maxBreadcrumbs: 100,
})
```





### Add ErrorBoundary

If you're using React 16 or above, you can use [ErrorBoundary](https://reactjs.org/docs/error-boundaries.html) component to catch render error and automatically send to server.Here are some configurations of ErrorBoundary component that provided by @js-wtao/react.

**index.tsx**

```tsx
import React from 'react'
import App from './App'
import { MitoProvider } from '@js-wtao/react'
import { init } from '@js-wtao/browser'


const MitoInstance = init({
  dsn: 'https://test.com/yourServer',
  maxBreadcrumbs: 100,
})

const APP: React.FC = () => {
  return (
    <MitoProvider MitoInstance={MitoInstance}>
        <App />
    </MitoProvider>
  )
}
```

**OtherComponent.tsx**


```tsx
import { ErrorBoundary } from '@js-wtao/react'
import ChildComponent from './ChildComponent'

export default function OtherComponent() {
  const onError = (error: Error, componentStack: string) => {
    console.log('triggered is render error')
  }
  const ErrorFallback = <div>Opps,trigger render error</div>
  return (
    <>
    	// this is used index.tsx's MitoInstance
      <ErrorBoundary onError={onError} fallback={ErrorFallback}>
        <ChildComponent></ChildComponent>
      </ErrorBoundary>
    </>
  )
}
```

## multiple instances

`init`return a `BrowserClient`, so you can define multiple instances with `init`.The configuration and hooks between multiple instances does not affect each other.

```js
import React from 'react'
import App from './App'
import { MitoProvider } from '@js-wtao/react'
import { init } from '@js-wtao/browser'


const MitoInstance_one = init({
  dsn: 'https://test.com/yourServer_one',
  maxBreadcrumbs: 100,
})

const MitoInstance_two = init({
  dsn: 'https://test.com/yourServer_two',
  maxBreadcrumbs: 20,
})

const APP: React.FC = () => {
  return (
    <MitoProvider MitoInstance={MitoInstance_one}>
      // this is used MitoInstance_one
        <App />
    		<MitoProvider MitoInstance={MitoInstance_two}>
           // this is used MitoInstance_two
           <OtherComponent />
        </MitoProvider>
    </MitoProvider>
  )
}
```

## Use in wx-mini
If you want to use in Weixin miniprogram,just replace `@js-wtao/browser` to `@js-wtao/wx-mini`.Just like this:

**install**
```bash
yarn add @js-wtao/react @js-wtao/wx-mini
```

```typescript
import React from 'react'
import App from './App'
import { MitoProvider } from '@js-wtao/react'
import { init } from '@js-wtao/wx-mini'


const MitoInstance = init({
  dsn: 'https://test.com/yourServer',
  maxBreadcrumbs: 100,
})

const APP: React.FC = () => {
  return (
    <MitoProvider MitoInstance={MitoInstance}>
        <App />
    </MitoProvider>
  )
}
```


## Using CDN in Browser
CDN way is **not recommended**.Because `@js-wtao/web` commonjs file is include `jsxRuntime` code,so it's size is larger than else package.

**index.html**

```html
<header>
  <script src="https://cdn.jsdelivr.net/npm/@js-wtao/web/dist/web.min.js"></script>
  <script>
    MITO.init({
		  dsn: 'https://test.com/yourServer',
		  maxBreadcrumbs: 100,
    });
  </script>
</header>
```

there is `MITO` varible automatically mounted on the window when you use cdn in script tag.Then you can use in react component

**index.tsx**

```tsx
import React from 'react'
import App from './App'

const MitoInstance = MITO.init({
  dsn: 'https://test.com/yourServer',
  maxBreadcrumbs: 100,
})

const APP: React.FC = () => {
  return (
    <MITO.MitoProvider MitoInstance={MitoInstance}>
        <App />
    </MITO.MitoProvider>
  )
}
```



