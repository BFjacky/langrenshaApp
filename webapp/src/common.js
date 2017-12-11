export default {
    install(Vue, options) {
        Vue.prototype.$common = {
            //主页面
            homePage: {
                selected: '',
            }
        };
    }
}