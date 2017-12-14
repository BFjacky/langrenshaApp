'use strict';

const Controller = require('egg').Controller;
const userSchema = require('../models/user.js')
class UserController extends Controller {
    async index() {
        this.ctx.body = 'hi, egg';
    }
    async userLogin() {
        let account = this.ctx.request.body.account;
        let password = this.ctx.request.body.password;

        //查看token携带的用户信息
        if (this.ctx.user != undefined) {
            account = this.ctx.user.account;
            password = this.ctx.user.password;
            this.ctx.user.infoByToken = true;
        }
        //数据库查询account
        const findByAccount = function (account) {
            return new Promise((resolve, reject) => {
                userSchema.find({ account: account }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        }
        //生成随机字符串
        const randomString = function () {
            //默认位数为200位
            let len = 200;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            var maxPos = $chars.length;
            var pwd = '';
            for (let i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        }
        //向数据库中插入token
        const upsertToken = function (account, token) {
            return new Promise((resolve, reject) => {
                userSchema.update({ account: account }, { token: token }, { mutil: true, upsert: true }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        }
        const userResult = await findByAccount(account);
        //该用户名已经注册
        if (userResult.length === 1) {
            //登陆成功
            if (password === userResult[0].password) {
                //用户手动登陆，设置新的token
                if (!this.ctx.user.infoByToken) {
                    let cookieStr = randomString();
                    this.ctx.cookies.set('lrstoken', cookieStr, {
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                    });
                    //登陆，将新的cookie字符串插入数据库中
                    let upsertResult = await upsertToken(account, cookieStr);
                }
                this.ctx.body = { success: true, message: '登陆成功' };
                return
            }
            //密码错误
            this.ctx.body = { success: false, message: '密码错误' };
            return
        }
        //账号不存在
        this.ctx.body = { success: false, message: '账号不存在' };
        return
    }
    async userSignin() {
        const account = this.ctx.request.body.account;
        const password = this.ctx.request.body.password;
        //查看该用户名是否有人已经注册了
        const findByAccount = function (account) {
            return new Promise((resolve, reject) => {
                userSchema.find({ account: account }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        }
        const saveUser = function (account, password) {
            return new Promise((resolve, reject) => {
                let mySchema = new userSchema({
                    account: account,
                    password: password,
                })
                mySchema.save((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        }
        let users = await findByAccount(account);
        if (users.length === 0) {
            let saveResult = await saveUser(account, password);
            this.ctx.body = { success: true, message: '注册成功' }
        }
        else {
            this.ctx.body = { success: false, message: '用户名已经被注册' }
        }
    }
}

module.exports = UserController;
