const _ = require("lodash");//没碰到需要使用的地方

class Chatbot {

    constructor(name      = throwIfMissing('name'),
                sex       = throwIfMissing('sex'),
                replyPipe = throwIfMissing('replyPipe')) {

        Object.assign(this, {
            name,
            sex,
            replyPipe
        });

    }

    reply(data) {

        let msg    = typeof data.msg === 'string' ? data.msg : toString(data.msg),
            replay = `[CQ:at,qq=${data.fromQQ}]\n`;

        if (msg.indexOf('你叫什么') !== -1) {

            replay += `我叫${this.name}\n性别是${this.sex === 0 ? '女' : '男'}`;

            this.replyPipe.send({
                data: data,
                msg : replay
            });

            return;
        }

        if (msg.indexOf('你好') !== -1) {

            replay += '你好，请问有什么需要帮助的吗？';

            this.replyPipe.send({
                data: data,
                msg : replay
            });

            return;
        }

        replay += `喵？\n\n你可以这样问我\n【你叫什么】\n【你好】`;

        this.replyPipe.send({
            data: data,
            msg : replay
        });

    }

}

module.exports = Chatbot;