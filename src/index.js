require('./init');
const EVENT_HANDLER = require('./event-handler/event-handler');
const EVENT_PIPE    = require('./util/event-pipe');


EVENT_HANDLER.init();

EVENT_PIPE.add((res) => {
    console.log(res, 1);
});

EVENT_PIPE.add((res) => {
    console.log(res, 2);
});

EVENT_PIPE.add((res) => {
    console.log(res, 3);
});

setTimeout(() => {
    EVENT_HANDLER.sendGroupMsg(143123843, "牛牛超人");
}, 3000);