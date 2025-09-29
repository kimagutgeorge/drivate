import { createApp } from "vue";
import router from "./router";
import "@/assets/style/global.css";
import App from "./App.vue";

import VueApexCharts from "vue3-apexcharts";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
  .use(router)
  .use(pinia)
  .use(router)
  .use(VueApexCharts)
  .component("apexchart", VueApexCharts)
  .mount("#app");
