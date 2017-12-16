/*
    用户信息
*/
const db = require('./db.js');
Schema = db.Schema;
const userSchema = new Schema(
    {
        account: String,
        password: String,
        token: String,
        name: String,//昵称
        id: String,//用户id
        gxqm: String,//个性签名
    }, {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
module.exports = db.model('user', userSchema);
