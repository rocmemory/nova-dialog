declare const window: {
    __lazy_handlers: { [key: string]: LazyHandler }
} & Window

class LazyHandler {

    key: string;
    task: any;
    point: number;
    timer: any;

    constructor(key: string) {
        this.key = key;
        this.task = null;
        this.point = (new Date()).getTime();
        this.timer = setInterval(() => {
            this.handle();
        }, 500);
    }

    addTask(task: any) {
        this.task = task;
        this.point = (new Date()).getTime();
    }

    handle() {
        let now = (new Date()).getTime();
        if (now - this.point < 490) return;
        clearInterval(this.timer);
        this.timer = 0;
        if (this.task) this.task();
    }

}
window.__lazy_handlers = {};

/**
 * 在一个适当的时间区间内，可频繁调用但只会执行一次的异步委托
 * @param {String} key 用于隔离不同委托池的关键字
 * @returns 
 */
export function lazy(key: string): Promise<unknown> {

    var handler = window.__lazy_handlers[key];
    if (!handler || !handler.timer) {
        handler = new LazyHandler(key);
        window.__lazy_handlers[key] = handler;
    }

    return new Promise(function (resolve, reject) {
        handler.addTask(resolve);
    });

}