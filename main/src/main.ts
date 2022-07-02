import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import appList from "./store/app-list";
import registerMicroApp from './micro/index';

registerMicroApp(appList, {
  beforeLoad: [
    () => {
      console.log("main beforeLoad");
    },
  ],
  mounted: [
    () => {
      console.log("main mounted");
    },
  ],
  destroyed: [
    () => {
      console.log("main destroyed");
    },
  ],
});

createApp(App).use(store).use(router).mount("#main-app");
