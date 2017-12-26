'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  //user前端提交 用户名和密码 登陆  返回值:{success:Boolean,message:String}
  router.post('/user/login', controller.user.userLogin);

  //user前端提交 用户名和密码 注册  返回值:{success:Boolean,message:String}
  router.post('/user/signin', controller.user.userSignin)

  //user前端提交 用户验证String(token) 获取个人信息  返回值:{success:Boolean,info:Object}
  router.post("/user/getInfo", controller.user.getInfo)

  //room前端提交 配置信息 roomInfo:Object,房主信息由token获得  返回值:{success:Boolean,roomNumber:String,message:String}
  router.post("/room/create", controller.room.create)

  //room前端提交 房间号   roomNumber:String,用户信息由token获得 返回值:{success:Boolean,message:String}
  router.post("/room/goRoom", controller.room.goRoom)

  /**
   * 查看房间信息
   * room前端提交 房间号   roomNumber:String 返回值:{success:Boolean,message:String,roomInfo:Object}
   */
  router.get("/room/getInfo", controller.room.getInfo)

  /**
   * 坐下座位
   * room前端提交 房间号roomNumber:String,座位号seatNumber:Number，根据token获得用户信息     返回值:{success:Boolean,message:String}
   */
  router.post("/room/sitHere", controller.room.sitHere)

  /**
   * 查看身份
   * room前端提交 房间号roomNumber:String,根据token获得用户信息 返回值:{success:Boolean,message:String,role:String}
   */
  router.post("/room/checkRole", controller.room.checkRole)


  /**
   * 发起投票
   * room前端提交 房间号roomNumber:String,根据token获得用户信息 返回值:{success:Boolean,message:String}
   */
  router.post("/room/beginVote", controller.room.beginVote)


  /**
   * 投票处决某人
   * room前端提交 房间号roomNumber:String,投票目标座位号:seatNumber:Number 根据token获得用户信息 返回值:{success:Boolean,message:String}
   */
  router.post("/room/voteKill", controller.room.voteKill)


  /**
   * 接收玩家提交的技能请求，更新夜晚信息，跳转到下一个回合
   * room前端提交 房间号roomNumber:String,该玩家的操作信息, 根据token获得用户信息  返回值:{success:Boolean,message:String}
   */
  router.post("/night/action",controller.night.action)
};
