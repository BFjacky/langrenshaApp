'use strict';

const Controller = require('egg').Controller;
const roomSchema = require('../models/room.js')
const userSchema = require('../models/user.js')
class RoomController extends Controller {
    async index() {
        this.ctx.body = 'hi, egg';
    }
    async create() {
        //获得当前数据库中总共的房间数量
        const getRoomsLength = function () {
            return new Promise((resolve, reject) => {
                roomSchema.find({}, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res.length);
                    }
                })
            })
        }
        //将数据存入数据库中
        const saveInDB = function (roomSchema) {
            return new Promise((resolve, reject) => {
                roomSchema.save((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        }
        //将boolean转换为1
        const parse = function (cond) {
            if (cond) {
                return 1;
            } else {
                return 0;
            }
        }
        //根据账号查询用户id
        const findIdByAccount = function (account) {
            return new Promise((resolve, reject) => {
                userSchema.find({ account: account }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res[0].id);
                    }
                })
            })
        }
        //根据中间件获得创建房间的房主信息
        if (this.ctx.user === undefined) {
            //房主不存在，则提示请先登录
            this.ctx.body = { success: false, roomNumber: "", message: "请先登录，再创建房间" }
            return;
        }
        let idResult = await findIdByAccount(this.ctx.user.account);
        if (idResult === "") {
            this.ctx.body = { success: false, roomNumber: "", message: "未能找到此用户id信息" }
            return;
        }

        //检查信息,获得信息
        let people_number = this.ctx.request.body.roomInfo.people_number;
        let cm_number = this.ctx.request.body.roomInfo.cm_number;
        let lr_number = this.ctx.request.body.roomInfo.lr_number;
        let yvyanjia = parse(this.ctx.request.body.roomInfo.yvyanjia);
        let nvwu = parse(this.ctx.request.body.roomInfo.nvwu);
        let lieren = parse(this.ctx.request.body.roomInfo.lieren);
        let shouwei = parse(this.ctx.request.body.roomInfo.shouwei);
        let baichi = parse(this.ctx.request.body.roomInfo.baichi);
        let qishi = parse(this.ctx.request.body.roomInfo.qishi);
        let bailangwang = parse(this.ctx.request.body.roomInfo.bailangwang);
        let roomNumber = await getRoomsLength() + 100000;

        //将信息存入数据库,先生成一个数据库表格
        let myRoomSchema = new roomSchema({
            roomNumber: roomNumber,//房间号
            people_number: people_number,//玩家人数
            cm_number: cm_number,//村民数量
            lr_number: lr_number,//狼人数量
            yvyanjia: yvyanjia,//预言家数量
            nvwu: nvwu,//女巫数量
            lieren: lieren,//猎人数量
            shouwei: shouwei,//守卫数量
            baichi: baichi,//白痴数量
            qishi: qishi,//骑士数量
            bailangwang: bailangwang,//白狼王数量
            masterId: idResult,//房主id
        })

        let saveReuslt = await saveInDB(myRoomSchema);
        this.ctx.body = { success: true, roomNumber: roomNumber, message: "成功创建房间" }
    }

    //进入房间
    async goRoom() {
        //根据账号查找用户信息
        const finduserByAccount = function (account) {
            return new Promise((resolve, reject) => {
                userSchema.find({ account: account }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res[0]);
                    }
                })
            })
        }
        //根据房间号查找数据库中的房间信息
        const findRoomByRoomNumber = function (roomNumber) {
            return new Promise((resolve, reject) => {
                roomSchema.find({ roomNumber: roomNumber }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res[0]);
                    }
                })
            })
        }
        //将新的player信息存入到房间中
        const updatePlayers = function (roomNumber, players) {
            return new Promise((resolve, reject) => {
                roomSchema.update({ roomNumber: roomNumber }, { players: players }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        }

        //判断用户信息
        if (this.ctx.user === undefined) {
            //没有用户信息
            this.ctx.body = { success: false, message: "进入房间失败,请先登录" }
            return;
        }
        //根据token获得的用户信息查找用户id，name
        let userResult = await finduserByAccount(this.ctx.user.account);
        //未能获取用户信息
        if (userResult === undefined) {
            this.ctx.body = { success: false, message: "进入房间失败，无法获取当前用户信息" }
            return;
        }
        //成功获取用户信息-->>获取房间号
        let roomNumber = this.ctx.request.body.roomNumber;
        //根据房间号获取房间信息
        let roomResult = await findRoomByRoomNumber(roomNumber);
        //保存原来的player信息，加入新的player信息
        let players = roomResult.players;
        let newPlayer = {
            name: userResult.name,
            id: userResult.id,
            role: undefined,
            seatNumber: undefined,
        }
        players[players.length] = newPlayer;
        let updatePlayerReuslt = await updatePlayers(roomNumber, players);
        //成功更新了数据库中的room信息,该玩家已经进入了这个房间
        if (updatePlayerReuslt.ok !== 0) {
            this.ctx.body = { success: true, message: "成功进入房间" }
        }
    }
}

module.exports = RoomController;
