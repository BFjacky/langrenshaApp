const userinfo = require('../models/user.js');

module.exports = () => {
    return async function (ctx, next) {
        //根据token获得用户信息
        const findByToken = function (token) {
            return new Promise((resolve, reject) => {
                userinfo.find({ token: token }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        }
        const token = ctx.cookies.get('lrstoken');
        let findResult = await findByToken(token);
        //将用户的信息保存在 context 中
        if (findResult.length === 0) {
            await next();
            return;
        }
        ctx.user = {};
        ctx.user.account = findResult[0].account;
        ctx.user.password = findResult[0].password;
        console.log(ctx.user);
        await next();
        return;
    }
}