module.exports = () => {
    return async function (ctx, next) {
        console.log('跨域中间件')
        //---设置可跨域访问----
        ctx.response.append("Access-Control-Allow-Origin", "*");
        ctx.response.append("Access-Control-Allow-Headers", "X-Requested-With");
        ctx.response.append("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        ctx.response.append("Content-Type", "application/json;charset=utf-8");
        // ctx.response.append("Access-Control-Allow-Origin", "*");
        // ctx.response.append("Access-Control-Allow-Credentials", "true");
        // ctx.response.append("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        // ctx.response.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        await next();
        return;
    }
}