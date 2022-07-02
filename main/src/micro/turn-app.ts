import { AppItem } from "./app-list";
import {
  findApp,
  getCurrentPathName,
  getGlobalData,
  setGlobalData,
} from "./helper";
import { loadHtml } from "./load-html";
import { getMainLifeCycle, MainLifeCycle } from "./main-life-cycle";

export const turnApp = async () => {
  const pathname = getCurrentPathName();
  const oldAppPath = getGlobalData("__CURRENT_SUB_APP__");
  if (oldAppPath === pathname) {
    return;
  }

  // 获取上一个应用
  const prevApp = findApp(oldAppPath);
  if (prevApp) {
    prevApp.proxy?.inactive();
    await destroyed(prevApp);
  }
  // 获取下一个应用
  const nextApp = findApp(pathname);

  setGlobalData("__CURRENT_SUB_APP__", pathname);

  if (nextApp) {
    const app = await beforeLoad(nextApp);

    await mounted(app);
  }
};

const beforeLoad = async (app: AppItem) => {
  await runMainLifeCycle("beforeLoad");
  app?.beforeLoad?.();
  return await loadHtml(app);
};

const mounted = async (app: AppItem) => {
  app?.mounted?.();
  await runMainLifeCycle("mounted");
};

const destroyed = async (app: AppItem) => {
  app?.destroyed?.();

  await runMainLifeCycle("destroyed");
};

// 执行主应用生命周期
const runMainLifeCycle = async (type: keyof MainLifeCycle) => {
  const fns = getMainLifeCycle()[type];
  if (fns && fns.length) {
    await Promise.all(fns.map(async (fn) => await fn()));
  }
};
