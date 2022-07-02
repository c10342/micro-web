import { AppItem } from "./app-list";
import { setGlobalData } from "./helper";
import { ProxySandbox } from "./proxy-sandbox";
import { SnapShotSandbox } from "./snap-shot-sandbox";

const isLifeCycle = (item: any) => {
  return item && item.bootstrap && item.mount && item.unmount;
};
// 执行应用中的 js 内容 eval篇
export const performScriptForEval = (script: string, app: AppItem) => {
  const global = app.proxy?.proxy ?? window;
  (window as any).proxy = global;
  const scriptText = `
    ((window) => {
        try {
            ${script}
        } catch (error) {
            console.error('run script error: ' + error)
        }
        return window['${app.name}']
    })(window.proxy)
      `;

  return eval(scriptText);
};

export const sandbox = (script: string, app: AppItem) => {
  const proxy = new ProxySandbox();
  if (!app.proxy) {
    app.proxy = proxy;
  }
  setGlobalData("__MICRO_WEB__", true);
  const ret = performScriptForEval(script, app);
  if (isLifeCycle(ret)) {
    app.beforeLoad = ret.bootstrap;
    app.mounted = ret.mount;
    app.destroyed = ret.unmount;
  }
};
