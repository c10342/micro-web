import { App, createApp } from "vue";
import AppComponent from "./App.vue";
import router from "./router";
import store from "./store";

let instance:App|null;
function render() {
  instance = createApp(AppComponent);

  instance.use(store).use(router).mount("#app");
}

if (!(window as any).__MICRO_WEB__) {
  render();
}

window.addEventListener('test-event', (data:any) => {
  console.log(data.detail);
  
})

export function bootstrap() {
  console.log("bootstrap");
}

export function mount() {
  console.log("mount");
  render();
}

export function unmount() {
  console.log("unmount");
  instance?.unmount()
}
