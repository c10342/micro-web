// 快照沙箱
// 缺点：不支持多实例

// window上面有些属性是不能进行set的
const list = ["window", "document"];

const shouldProxy = (key: string) => {
  return window.hasOwnProperty(key) && !list.includes(key);
};

export class SnapShotSandbox {
  // 代理对象
  proxy = window;
  // 创建一个沙箱快照
  snapshot: Map<any, any> = new Map();
  constructor() {
    this.active();
  }
  // 沙箱激活
  active() {
    // 遍历全局环境
    for (const key in window) {
      if (shouldProxy(key)) {
        this.snapshot.set(key, window[key]);
      }
    }
  }
  // 沙箱销毁
  inactive() {
    for (const key in window) {
      if (shouldProxy(key)) {
        if (window[key] !== this.snapshot.get(key)) {
          // 还原操作
          window[key] = this.snapshot.get(key);
        }
      }
    }
  }
}
