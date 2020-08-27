import Vue from "vue";
import App from "./App.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from "./router";

Vue.config.productionTip = false;
// Vue.use(Loading);
Vue.component("Loading", Loading);
Vue.use(VueAxios, axios);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");