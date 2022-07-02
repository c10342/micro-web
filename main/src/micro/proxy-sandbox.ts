// 快照沙箱

export class ProxySandbox{
    proxy!: Window & typeof globalThis;
    defaultValue: Record<string, any> = {}
    constructor() {
        this.active()
    }

    active() {
        this.proxy = new Proxy(window, {
            get: (target, key: any) => {
                const value = this.defaultValue[key] ?? target[key]
                if (typeof value === 'function') {
                    return value.bind(target)
                }
                return value
            },
            set:(target, key:any,value:any)=> {
                this.defaultValue[key] = value
                return true
            }
        })
    }

    inactive() {
        this.defaultValue ={}
    }
}