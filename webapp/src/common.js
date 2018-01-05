export default {
    install(Vue, options) {
        Vue.prototype.$common = {
            //主页面
            homePage: {
                selected: '',
            },
            //暂停毫秒
            pause: function (timeout) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(true)
                    }, timeout);
                })
            },
            //状态管理
            status: {
                //当前用户是否已经尝试过登陆请求
                hasTryLogin: false,
                //当前用户是否已经登陆成功
                hasLogin: false,
            },
            //url集合
            url: {
                host: "http://ccc.feit.me",
                //host: 'http://47.94.15.66:7001',
                userSignin: '/user/signin',
                userLogin: '/user/login',
                userGetInfo: '/user/getInfo',
                roomCreate: '/room/create',
                roomGo: "/room/goRoom",
                roomGetInfo: "/room/getInfo",
                roomSitHere: "/room/sitHere",
                roomCheckRole: "/room/checkRole",
                roomBeginVote: "/room/beginVote",
                roomGetId: "/room/getId",
                roomVoteKill: "/room/voteKill",
                nightAction: "/night/action",
            },
            //跟据当前路由检查该页面是回退的还是前进
            urlName: {
                homePage: 0,
                gameBackground: 1,
                personalDetail: 1,
                cidian: 1,
                gamerule: 1,
                loginPage: 1,
                developer: 1,
                signin: 2,
                beforeUrl: '',
            },
            /**
             * 回退路由返回true，
             * 前进路由返回false，
             */
            isBackUrl: function (myUrlName) {

                if (this.urlName.beforeUrl === '') {
                    this.urlName.beforeUrl = myUrlName;
                    return false;
                }
                let beforeUrlName = this.urlName.beforeUrl;
                if (this.urlName[myUrlName] <= this.urlName[beforeUrlName]) {
                    this.urlName.beforeUrl = myUrlName;
                    return true;
                }

                this.urlName.beforeUrl = myUrlName;
                return false;
            },
        };
    }
}