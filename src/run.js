const EVENT_HANDLER = require('./event-handler/event-handler');

setTimeout(() => {
    EVENT_HANDLER.sendGroupMsg(143123843, "牛牛超人");
}, 3000);