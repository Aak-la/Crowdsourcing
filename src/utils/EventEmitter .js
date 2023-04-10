class EventEmitter {
    constructor() {
        this.list = []
    }
    on(name, fn) {
        if (this.list[name]) {
            this.list[name].push(fn)
        } else {
            this.list[name] = [fn]
        }

    }
    off(name, fn) {
        if (this.list[name]) {
            const index = this.list[name].findIndex(f === fn || f.callback === fn)
            if (index >= 0) {
                tasks.splice(index, 1)
            }
        }
    }
    emit(name, once = false, ...args) {
        if (this.list[name]) {
            let tasks = this.list[name].slice()
            for (let fn of tasks) {
                fn(...args)
            }
            if (once) {
                delete this.list[name]
            }
        }
    }
}

export default new EventEmitter()