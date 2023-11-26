import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/assets/style.css';
import axios from 'axios';
import Toaster from "@meforma/vue-toaster";
import 'vue-loading-overlay/dist/css/index.css';

axios.defaults.baseURL = 'https://eastlibya.desert-technology.com.ly/api'

createApp(App).use(createPinia()).use(Toaster).use(router,axios).mount('#app')

// document.getElementsByName('html')[0].setAttribute('dir','rtl')