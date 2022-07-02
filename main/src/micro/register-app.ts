import { AppItem, setAppList } from "./app-list";
import { MainLifeCycle, setMainLifeCycle } from "./main-life-cycle";
import { rewriteRouter } from "./rewrite-router";

export const registerApp = (list: AppItem[], mainLifeCycle?: MainLifeCycle) => {
  rewriteRouter();
  setAppList(list);
  mainLifeCycle && setMainLifeCycle(mainLifeCycle);
};
