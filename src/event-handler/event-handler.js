const WebSocketClient = require('websocket').client;

function init() {
    return new Promise((resolve, reject) => {

        let client = new WebSocketClient();

        client.on('connect', (conn) => {

            resolve(conn);

            conn.on('error', (error) => {
                console.log(error);
            });

            conn.on('close', () => {
                console.log(`close client`);
            });

            conn.on('message', (message) => {
                if (message.type === 'utf8') {
                    // console.log(message);
                    this.msgPipe.send(message);
                }
            });

        });

        client.connect(`ws://${this.config.WS_WEB}:${this.config.PORT}`);

    });
}

function sendRaw(obj) {
    Reflect.apply(init, this, []).then((res) => {
        res.sendUTF(JSON.stringify(obj));
    });
}

/**
 * 发送群信息
 * @param {Number} groupId QQ群号
 * @param {String} msg 需要发送的消息
 */
function sendGroupMsg(groupId = throwIfMissing('groupId'), msg = throwIfMissing('msg')) {

    Reflect.apply(sendRaw, this, [{
        act    : 101,
        groupid: groupId,
        msg    : msg
    }]);

}

class EventHandler {

    constructor(config, msgPipe, replyPipe) {
        this.config    = config;
        this.msgPipe   = msgPipe;
        this.replyPipe = replyPipe;

        Reflect.apply(init, this, []);

        this.replyPipe.obtain((res) => {

            if (res.data.hasOwnProperty('fromGroup')) {
                Reflect.apply(sendGroupMsg, this, [res.data.fromGroup, res.msg]);
            }

        });
    }

}

function create(config    = throwIfMissing('EventHandler config'),
                msgPipe   = throwIfMissing('EventHandler pipe'),
                replyPipe = throwIfMissing('replyPipe')) {
    return new EventHandler(config, msgPipe, replyPipe);
}

module.exports = create;