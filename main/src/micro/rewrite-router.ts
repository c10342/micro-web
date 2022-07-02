/**
 * 路由拦截
 */

import { turnApp } from "./turn-app";

const patchRouter = (globalEvent: Function, eventName: string) => {
  return function () {
    const e = new Event(eventName);
    // @ts-ignore
    globalEvent.apply(this, arguments);
    window.dispatchEvent(e);
  };
};

export const rewriteRouter = () => {
  window.history.pushState = patchRouter(
    window.history.pushState,
    "micro_push"
  );
  window.history.replaceState = patchRouter(
    window.history.replaceState,
    "micro_replace"
  );

  window.addEventListener("micro_push", turnApp);
  window.addEventListener("micro_replace", turnApp);
  window.addEventListener("popstate", turnApp);
};
