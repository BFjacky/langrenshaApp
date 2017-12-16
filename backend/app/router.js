'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  //user前端提交 用户名和密码 登陆  返回值:{success:boolean,message:String}
  router.post('/user/login', controller.user.userLogin);

  //user前端提交 用户名和密码 注册  返回值:{success:boolean,message:String}
  router.post('/user/signin', controller.user.userSignin)

  //user前端提交 用户验证String(token) 获取个人信息  返回值:{success:boolean,info:Object}
  router.post("/user/getInfo", controller.user.getInfo)

  //room前端提交 配置信息 roomInfo:Object,房主信息由token获得  返回值:{success:boolean,roomNumber:String,message:String}
  router.post("/room/create", controller.room.create)

  //room前端提交 房间号   roomNumber:String,用户信息由token获得 返回值:{success:boolean}
  router.post("/room/goRoom", controller.room.goRoom)
};
