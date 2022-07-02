/**
 * 存储子应用
 */

import { ProxySandbox } from "./proxy-sandbox";
import { SnapShotSandbox } from "./snap-shot-sandbox";

export interface AppItem {
  name: string;
  entry: string;
  container: string;
  activeRule: string;
  beforeLoad?: Function;
  mounted?: Function;
  destroyed?: Function;
  proxy?:SnapShotSandbox|ProxySandbox
}

let appList: AppItem[] = [];

export const setAppList = (data: AppItem[]) => {
  appList = data;
};

export const getAppList = () => {
  return appList;
};
