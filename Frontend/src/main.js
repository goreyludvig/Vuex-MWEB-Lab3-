import Vue from  "vue";
import App from "./app.vue";
import store from './store';

Vue.config.productionTip = false;

const vueApp = new Vue({
    store,
    render: h=>h(App)
});

vueApp.$mount("#app");