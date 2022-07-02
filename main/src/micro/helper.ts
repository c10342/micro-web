import { getAppList } from "./app-list";

export const getCurrentPathName = () => {
  return window.location.pathname.replace(/\/$/, "");
};

// 获取当前路径所对应的子应用
export const getCurrentApp = () => {
  const pathname = getCurrentPathName();
  return getAppList().find((item) => item.activeRule === pathname);
};

// 给window设置全局应用
export const setGlobalData = (key: string, value: any) => {
  (window as any)[key] = value;
};

export const getGlobalData = (key: string, defaultVal?: any) => {
  const data = (window as any)[key];
  return data ?? defaultVal;
};

// 查找子应用
export const findApp = (activeRule: string) => {
  return getAppList().find((item) => item.activeRule === activeRule);
};


export const fetchResource = (url: string) => {
  return fetch(url).then(res=>res.text())
}