/*
    房间信息
*/
const db = require('./db.js');
Schema = db.Schema;
const roomSchema = new Schema(
    {
        roomNumber: String, //房间号
        people_number: Number,//玩家人数
        cm_number: Number,//村民数量
        lr_number: Number,//狼人数量
        yvyanjia: Number,//预言家数量
        nvwu: Number,//女巫数量
        lieren: Number,//猎人数量
        shouwei: Number,//守卫数量
        baichi: Number,//白痴数量
        qishi: Number,//骑士数量
        bailangwang: Number,//白狼王数量
        masterId: String,//房主id
        players: Array,//所有玩家的id数组(包括房主的id)
        /**
         * player：{
         *      name:String, //用户昵称
         *      id:String,  //用户id
         *      role:String, //身份
         *      seatNumber:Number, //座位号
         * }
         */
    }, {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
module.exports = db.model('room', roomSchema);
