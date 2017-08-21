const EventEmitter = require("events");

class EventPipe extends EventEmitter {

    constructor(tag) {
        super();
        this.tag = tag;
    }

    send(msg) {
        super.emit(this.tag, msg);
    }

    obtain(fn) {
        super.on(this.tag, fn);
    }

}

function create(tag) {

    let temp = new EventPipe(tag);

    return {
        send  : temp.send,
        obtain: temp.obtain
    }
    
}

module.exports = create;