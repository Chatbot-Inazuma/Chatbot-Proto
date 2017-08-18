const EventEmitter = require("events");

class EventPipe extends EventEmitter {

    constructor() {
        super();
    }

    send(msg) {
        super.emit('newMsg', msg);
    }

    add(fn) {
        super.on('newMsg', fn);
    }

}

let pipe = new EventPipe();

module.exports = {
    send: pipe.send,
    add : pipe.add
};