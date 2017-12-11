export default {
    install(Vue, options) {
        Vue.prototype.$common = {
            //主页面
            homePage: {
                selected: '',
            },
            //跟据当前路由检查该页面是回退的还是前进
            urlName: {
                homePage: 0,
                gamerule: 1,
                personalDetail: 1,
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