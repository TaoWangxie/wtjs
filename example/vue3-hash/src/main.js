import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// import { init } from "@js-wtao/browser";
// import { vuePlugin } from "@js-wtao/vue";
// window.wtjsInstance = init({
//     // set debug true to convenient debugger in dev,set false in prod
//     debug: true,
//     vue: app,
//     dsn: 'http://82.156.198.41:11112/ceshi',
//     maxBreadcrumbs: 100
// },[vuePlugin])

const app = createApp(App)

const instance = window.WTJS.init({
    debug: true,
    apikey: 'sdasda',
    silentConsole: true,
    silentXhr: false,
    maxBreadcrumbs: 20,
    dsn: 'http://82.156.198.41:11112/ceshi',
    throttleDelayTime: 0,
    backTrackerId(){
        return 'userid' //用户uid
    },
    configReportXhr(xhr, reportData) {
        xhr.setRequestHeader('mito-header', 'test123')
    }
},[window.WTJS_vue.vuePlugin])
app.config.globalProperties.$wtjs = instance;



app.use(router)

app.mount('#app')
