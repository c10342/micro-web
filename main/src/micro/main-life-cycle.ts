/**
 * 存储主应用生命周期
 */

export interface MainLifeCycle {
  beforeLoad: Function[];
  mounted: Function[];
  destroyed: Function[];
}

let mainLifeCycle: MainLifeCycle = {
  beforeLoad: [],
  mounted: [],
  destroyed: [],
};

export const getMainLifeCycle = () => mainLifeCycle;

export const setMainLifeCycle = (data: MainLifeCycle) => {
  mainLifeCycle = data;
};
