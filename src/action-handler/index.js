require('../init');
let appConfig = require('../config');
let eventPipe = require('../util/event-pipe');
let chatbot   = require('../bot');

let msgPipe   = new eventPipe('newMsg');
let replyPipe = new eventPipe('reply');

let eventHandler = require('../event-handler/event-handler')(appConfig, msgPipe, replyPipe);

let HTBot = new chatbot('HT小管家', 0, replyPipe);

msgPipe.obtain((res) => {

    console.log(res.utf8Data, '接收到信息');
    let data = JSON.parse(res.utf8Data);
    (data.msg.indexOf(`[CQ:at,qq=1761879519]`) === 0) && (HTBot.reply(data));

});