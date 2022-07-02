import { getCurrentApp, setGlobalData } from "./helper";

export const start = () => {
  // 查找符合当前路由的子应用
  const app = getCurrentApp();
  if (!app) {
    return;
  }
  const { pathname, hash } = window.location;
  const url = `${pathname}${hash}`;
  window.history.pushState("", "", url);
  setGlobalData('__CURRENT_SUB_APP__',app.activeRule)
};
