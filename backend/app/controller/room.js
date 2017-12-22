'use strict';

const Controller = require('egg').Controller;
const roomSchema = require('../models/room.js')
const userSchema = require('../models/user.js')
class RoomController extends Controller {
    async index() {
        this.ctx.body = 'hi, egg';
    }
    //创建房间
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
            moment: "speak",//默认speak阶段
            nowVoteTime: 0,//当前投票轮次 设为0次
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
                        resolve(res);
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
        if (roomResult.length === 0) {
            //查无此房间
            this.ctx.body = { success: false, message: "没有找到该房间" }
            return;
        }
        roomResult = roomResult[0];
        //保存原来的player信息，加入新的player信息
        let players = roomResult.players;
        //判断该用户是否已经进入了该房间
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === userResult.id) {
                this.ctx.body = { success: true, message: "已经进入了此房间" }
                return
            }
        }
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

    //获取一个房间信息
    async getInfo() {
        //根据房间号获得房间信息
        const getRoomInfo = function (roomNumber) {
            return new Promise((resolve, reject) => {
                roomSchema.find({ roomNumber: roomNumber }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        }
        //wait阻塞一段时间
        const wait = function (times) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('ok')
                }, times);
            })
        }
        const roomNumber = this.ctx.request.query.roomNumber;
        const khdRoomInfo = this.ctx.request.query.roomInfo;

        let roomInfo = await getRoomInfo(roomNumber);
        if (roomInfo.length === 0) {
            //没有找到该房间,房间信息没有找到就等两秒再返回前端
            await wait(2000);
            this.ctx.body = { success: false, message: "没有找到该房间" }
            return;
        }
        //找到了该房间-->返回前端信息
        roomInfo = roomInfo[0];

        /**
         * 设置定时器,检查数据库中和客户端提交的roomInfo是否一致，不一致，则将最新信息返回给前端
         * 判断对象相等:因为对象属性顺序没有改变，所以直接JSON转化字符串判断相等
         */

        //设置最大循环次数
        let times = 400;
        while (times-- !== 0) {
            if (khdRoomInfo === JSON.stringify(roomInfo)) {
                //更新roominfo
                roomInfo = await getRoomInfo(roomNumber);
                roomInfo = roomInfo[0];
            } else {
                this.ctx.body = { success: true, message: "成功找到该房间", roomInfo: roomInfo }
                return;
            }
            await wait(10);
        }

        //请求超时返回一次
        this.ctx.body = { success: false, message: "请求超时", roomInfo: roomInfo }
        return;
    }

    //坐下此座位
    async sitHere() {
        //根据房间号获得房间信息
        const getRoomInfo = function (roomNumber) {
            return new Promise((resolve, reject) => {
                roomSchema.find({ roomNumber: roomNumber }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        }
        //根据账号查找用户信息
        const finduserByAccount = function (account) {
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
        //将新的players信息更新到数据库中
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


        const roomNumber = this.ctx.request.body.roomNumber;
        const seatNumber = this.ctx.request.body.seatNumber;

        //未能获取到请求体信息
        if (seatNumber == undefined || roomNumber == undefined) {
            this.ctx.body = { success: false, message: "系统故障，请关掉app重新登陆" }
            return;
        }

        //未能获得用户信息
        if (this.ctx.user == undefined) {
            this.ctx.body = { success: false, message: "请先登录再选座位" }
            return;
        }
        let userResult = await finduserByAccount(this.ctx.user.account);
        if (userResult.length === 0) {
            this.ctx.body = { success: false, message: "请先登录再选座位" }
            return;
        }
        //获得了用户信息
        userResult = userResult[0];
        //未能获得房间信息
        let roomResult = await getRoomInfo(roomNumber);
        if (roomResult.length === 0) {
            this.ctx.body = { success: false, message: "该房间已过期" }
            return;
        }
        //获得了房间信息
        roomResult = roomResult[0];
        //遍历房间信息中的player信息-->先判断有没有其他的player坐了这个座位号-->将对应的player的座位号填上
        for (let i = 0; i < roomResult.players.length; i++) {
            if (roomResult.players[i].seatNumber === seatNumber) {
                this.ctx.body = { success: false, message: "该位置已经有人坐下了" };
                return;
            }
        }

        for (let i = 0; i < roomResult.players.length; i++) {
            //判断该玩家是否已经进入房间
            if (roomResult.players[i].id === userResult.id) {
                roomResult.players[i].seatNumber = seatNumber;
                //将新的room信息更新到数据库中
                let updateResult = await updatePlayers(roomNumber, roomResult.players)
                this.ctx.body = { success: true, message: "成功坐下" };


                //获得最新的players信息-->玩家已经坐满,为他们分发角色
                //判断是否每个进入房间的玩家都坐下了
                for (let i = 0; i < roomResult.players.length; i++) {
                    //有人没坐下或房间没进满
                    if (roomResult.players[i].seatNumber == null || roomResult.players.length !== roomResult.people_number) {
                        return;
                    }
                }
                console.log('所有人都坐下了')
                roomResult = await getRoomInfo(roomNumber);
                roomResult = roomResult[0]
                console.log(roomResult.players)

                //将所有的角色放进数组中
                let roles = [];
                let index = 0;
                for (let i = 0; i < roomResult.cm_number; i++) {
                    roles[index] = "cunmin";
                    index++;
                }
                for (let i = 0; i < roomResult.lr_number; i++) {
                    roles[index] = "langren";
                    index++;
                }
                for (let i = 0; i < roomResult.yvyanjia; i++) {
                    roles[index] = "yvyanjia";
                    index++;
                }
                for (let i = 0; i < roomResult.nvwu; i++) {
                    roles[index] = "nvwu";
                    index++;
                }
                for (let i = 0; i < roomResult.lieren; i++) {
                    roles[index] = "lieren";
                    index++;
                }
                for (let i = 0; i < roomResult.shouwei; i++) {
                    roles[index] = "shouwei";
                    index++;
                }
                for (let i = 0; i < roomResult.baichi; i++) {
                    roles[index] = "baichi";
                    index++;
                }
                for (let i = 0; i < roomResult.qishi; i++) {
                    roles[index] = "qishi";
                    index++;
                }
                for (let i = 0; i < roomResult.bailangwang; i++) {
                    roles[index] = "bailangwang";
                    index++;
                }
                //遍历players信息，为分配角色           
                function randomGet(arr) {
                    let number = Math.random() * arr.length + "";
                    number = number.split(".")[0];
                    number = parseInt(number);
                    let value = arr[number];
                    let arr1 = [];
                    let arr2 = [];
                    arr1 = arr.slice(0, number);
                    arr2 = arr.slice(number + 1, arr.length);
                    arr = arr1.concat(arr2);
                    return [value, arr]
                }
                for (let i = 0; i < roomResult.players.length; i++) {
                    let result = randomGet(roles);
                    roles = result[1];
                    roomResult.players[i].role = result[0];
                }
                //分配完角色重新放回数据库
                updateResult = await updatePlayers(roomNumber, roomResult.players)
                return;
            }
        }
        return;
    }
    async checkRole() {
        //根据房间号查找数据库中的房间信息
        const findRoomByRoomNumber = function (roomNumber) {
            return new Promise((resolve, reject) => {
                roomSchema.find({ roomNumber: roomNumber }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        }
        //根据账号查询用户
        const findIdByAccount = function (account) {
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
        if (this.ctx.user === undefined) {
            this.ctx.body = { success: false, message: "请先登录", role: "" }
            return;
        }
        const roomNumber = this.ctx.request.body.roomNumber;
        const userAccount = this.ctx.user.account;
        if (roomNumber == undefined || userAccount == undefined) {
            this.ctx.body = { success: false, message: "用户身份信息不完整", role: "" }
            return;
        }

        let roomInfo = await findRoomByRoomNumber(roomNumber);
        let user = await findIdByAccount(userAccount);
        if (roomInfo.length === 0 || user.length === 0) {
            this.ctx.body = { success: false, message: "未能找到此用户或此房间", role: "" }
            return;
        }

        roomInfo = roomInfo[0];
        user = user[0];
        //遍历查询该房间中用户的信息
        for (let i = 0; i < roomInfo.players.length; i++) {
            //找到该用户
            if (roomInfo.players[i].id === user.id) {
                //该玩家没有被分配身份
                if (roomInfo.players[i].role == null) {
                    this.ctx.body = { success: false, message: "请等所有玩家坐下，再次查看身份", role: "" }
                    return;
                }
                else {
                    this.ctx.body = { success: true, message: "成功获取身份", role: roomInfo.players[i].role }
                    return;
                }
            }
        }

        //没有在房间中找到该玩家
        this.ctx.body = { success: false, message: "请重新该进入房间", role: "" }
        return;
    }
    async beginVote() {
        //wait阻塞一段时间
        const wait = function (times) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('ok')
                }, times);
            })
        }
        //根据房间号更新倒计时时间
        const updateCountByRoomNumber = function (roomNumber, countDown) {
            return new Promise((resolve, reject) => {
                roomSchema.update({ roomNumber: roomNumber }, { countDown: countDown }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        }
        //根据房间号更新阶段信息，当前投票轮次信息
        const updateMomentByRoomNumber = function (roomNumber, moment, nowVoteTime) {
            return new Promise((resolve, reject) => {
                roomSchema.update({ roomNumber: roomNumber }, { moment: moment, nowVoteTime: nowVoteTime }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
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
                        resolve(res);
                    }
                })
            })
        }
        //根据账号查询用户
        const findIdByAccount = function (account) {
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
        if (this.ctx.user === undefined) {
            this.ctx.body = { success: false, message: "请先登录" }
            return;
        }
        const roomNumber = this.ctx.request.body.roomNumber;
        const userAccount = this.ctx.user.account;
        if (roomNumber == undefined || userAccount == undefined) {
            this.ctx.body = { success: false, message: "用户身份信息不完整" }
            return;
        }

        let roomInfo = await findRoomByRoomNumber(roomNumber);
        let user = await findIdByAccount(userAccount);
        if (roomInfo.length === 0 || user.length === 0) {
            this.ctx.body = { success: false, message: "未能找到此用户或此房间" }
            return;
        }

        roomInfo = roomInfo[0];
        user = user[0];

        //此用户不为房主不可发起投票
        if (user.id !== roomInfo.masterId) {
            this.ctx.body = { success: false, message: "你不是房主不能发起投票" }
            return;
        }
        //已经发起过投票了
        if (roomInfo.moment === "voteKill") {
            this.ctx.body = { success: false, message: "已经发起过投票了" }
            return;
        }
        //未到投票阶段不可投票
        if (roomInfo.moment !== "speak") {
            this.ctx.body = { success: false, message: "未到发起投票的时间" }
            return;
        }

        //房主发起投票，修改本地房间数据库
        let nowVoteTime = roomInfo.nowVoteTime + 1;
        let updateMoment = await updateMomentByRoomNumber(roomNumber, "voteKill", nowVoteTime);

        this.ctx.body = { success: true, message: "已发起投票" };

        //开始启动倒计时修改数据库,倒计时时间30s
        let times = 32;
        for (let i = times; i >= -3; i--) {
            await updateCountByRoomNumber(roomNumber, i);
            await wait(1000);
        }

        //投票结束，回到初始状态
        await updateCountByRoomNumber(roomNumber, null);
        await updateMomentByRoomNumber(roomNumber, "speak", nowVoteTime);
        return;

    }

    async voteKill() {
        //根据房间号查找数据库中的房间信息
        const findRoomByRoomNumber = function (roomNumber) {
            return new Promise((resolve, reject) => {
                roomSchema.find({ roomNumber: roomNumber }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        }
        //根据账号查询用户
        const findUserByAccount = function (account) {
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
        //跟新该用户的投票信息
        const updateVotes = function (roomNumber, votes) {
            return new Promise((resolve, reject) => {
                roomSchema.update({ roomNumber: roomNumber }, { votes: votes }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        }

        if (this.ctx.user === undefined) {
            this.ctx.body = { success: false, message: "请先登录" }
            return;
        }
        const roomNumber = this.ctx.request.body.roomNumber;
        const userAccount = this.ctx.user.account;
        //被票者座位号
        const seatNumber = this.ctx.request.body.seatNumber;
        if (roomNumber == undefined || userAccount == undefined) {
            this.ctx.body = { success: false, message: "用户身份信息不完整" }
            return;
        }

        let roomInfo = await findRoomByRoomNumber(roomNumber);
        let user = await findUserByAccount(userAccount);
        if (roomInfo.length === 0 || user.length === 0) {
            this.ctx.body = { success: false, message: "未能找到此用户或此房间" }
            return;
        }

        roomInfo = roomInfo[0];
        user = user[0];
        //投票者座位号
        let hostSeatNumber;
        for (let i = 0; i < roomInfo.players.length; i++) {
            if (roomInfo.players[i].id === user.id) {
                //找到投票人
                hostSeatNumber = roomInfo.players[i].seatNumber;
                break;
            }
        }
        //投票者未坐下
        if (hostSeatNumber == null) {
            this.ctx.body = { success: false, message: "请先坐到位置上在投票" }
            return;
        }

        //未到投票阶段
        if (roomInfo.moment !== "voteKill") {
            this.ctx.body = { success: false, message: "投票失败，未到投票环节" }
            return;
        }

        //该玩家已经投过票了
        roomInfo = await findRoomByRoomNumber(roomNumber);
        roomInfo = roomInfo[0];
        let voteStr = roomInfo.votes[roomInfo.nowVoteTime];
        if (voteStr != undefined) {
            let patt = /\d+->/g;
            voteStr = voteStr.match(patt);
            patt = /\d+/g;
            let number;
            for (let i = 0; i < voteStr.length; i++) {
                number = voteStr[i].match(patt);
                if (number == hostSeatNumber) {
                    this.ctx.body = { success: false, message: "已经投过票了,不能重复投票" };
                    return;
                }
            }
        }


        //将此次投票信息记录下来
        roomInfo = await findRoomByRoomNumber(roomNumber);
        roomInfo = roomInfo[0];
        roomInfo.votes[roomInfo.nowVoteTime] === undefined ? roomInfo.votes[roomInfo.nowVoteTime] = "" : roomInfo.votes[roomInfo.nowVoteTime];
        roomInfo.votes[roomInfo.nowVoteTime] = roomInfo.votes[roomInfo.nowVoteTime] + hostSeatNumber + "->" + seatNumber + ",";
        let updateVotesResult = await updateVotes(roomNumber, roomInfo.votes);
        if (updateVotesResult.ok === 1) {
            this.ctx.body = { success: true, message: "投票成功" }
            return;
        }

        this.ctx.body = { success: false, message: "未知错误" }
        return;

    }
}


module.exports = RoomController;
