const config          = require('../config');
const WebSocketClient = require('websocket').client;
const EVENT_PIPE      = require('../util/event-pipe');


function init() {
    return new Promise((resolve, reject) => {
        let client = new WebSocketClient();

        client.on('connect', function (conn) {

            resolve(conn);

            conn.on('error', function (error) {
                console.log(error);
            });

            conn.on('close', function () {
                console.log(`close client`);
            });

            conn.on('message', function (message) {
                if (message.type === 'utf8') {
                    console.log(message);
                    EVENT_PIPE.send(message);
                }
            });

        });

        client.connect(`ws://${config.WS_WEB}:${config.PORT}`);

    });
}

function sendRaw(obj) {
    init().then((res) => {
        res.sendUTF(JSON.stringify(obj));
    });
}

/**
 * 发送群信息
 * @param {Number} groupId QQ群号
 * @param {String} msg 需要发送的消息
 */
function sendGroupMsg(groupId = throwIfMissing('groupId'), msg = throwIfMissing('msg')) {
    sendRaw({
        act    : 101,
        groupid: groupId,
        msg    : msg
    });
}

module.exports = {
    sendGroupMsg,
    init
};