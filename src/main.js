import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueRouter);
Vue.use(VueLazyLoad);
Vue.prototype.$ajax = axios;
// Vue.use(axios);
const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        {path: '/home', component: resolve => require(['./components/home/home.vue'], resolve)},
        {path: '/search', component: resolve => require(['./components/search/search.vue'], resolve)},
        {path: '/upload', component: resolve => require(['./components/upload/upload.vue'], resolve)},
        {path: '/friend', component: resolve => require(['./components/friend/friend.vue'], resolve)},
        {path: '/personal', component: resolve => require(['./components/personal/personal.vue'], resolve)}
    ]
})
Vue.use(VueLazyLoad, {
    preLoad: 1.3,
    error: 'static/picture/error.png',
    loading: 'static/picture/loading.gif',
    attempt: 1
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
