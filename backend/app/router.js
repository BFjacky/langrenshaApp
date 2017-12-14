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

  //user前端提交 用户验证 获取个人信息  返回值:{success:boolean,info:Object}
  router.post("/user/getInfo", controller.user.getInfo)
};
