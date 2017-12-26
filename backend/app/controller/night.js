import { access } from 'fs';

/**
 * 用于处理房屋夜间信息
 * 回合流程控制
 */
'use strict';

const Controller = require('egg').Controller;
const roomSchema = require('../models/room.js')
const userSchema = require('../models/user.js')

class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hi, egg';
    }
    async action() {
        this.ctx.body = { success: false, message: "用户提交了一个操作" };
        if (this.ctx.user === undefined) {
            this.ctx.body = { success: false, message: "请先登录" }
            return;
        }
        //获得用户信息
        const account = this.ctx.user.account;
        let user = await new Promise((resolve, reject) => {
            userSchema.find({ account: account }, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
        if (user.length === 0) {
            this.ctx.body = { success: false, message: "用户信息不存在" };
            return;
        }
        user = user[0];

        //从数据库中找出该房间
        const roomNumber = this.ctx.request.body.roomNumber;
        let room = await new Promise((resolve, reject) => {
            roomSchema.find({ roomNumber: roomNumber }, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
        if (room.length === 0) {
            this.ctx.body = { success: false, message: "这个房间信息不存在" };
            return;
        }
        room = room[0];

        //查看当前的moment，储存该用户在次夜晚的操作，更新当前的moment为下一moment
        
    }
}

module.exports = HomeController;
