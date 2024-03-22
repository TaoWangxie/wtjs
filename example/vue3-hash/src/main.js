import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { init } from "@js-wtao/browser";
// import { vuePlugin } from "@js-wtao/vue";

import './assets/main.css'

const app = createApp(App)

// window.wtjsInstance = init({
//     // set debug true to convenient debugger in dev,set false in prod
//     debug: true,
//     vue: app,
//     dsn: 'https://test.com/yourInterface',
//     maxBreadcrumbs: 100
// },[vuePlugin])

app.use(router)

app.mount('#app')
