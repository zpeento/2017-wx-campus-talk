var Promise = require('../lib/es6-promise/es6-promise.min.js').Promise;

/**
 * 根据时间格式字符获取对应字符串
 *
 * refer to : http://php.net/manual/en/function.date.php
 *
 * @param format    时间格式(单个字符)
 * @param stamp     时间戳
 * @returns {string}
 */
var timeConvert = function (format, stamp) {
    var replace = '';
    switch (format) {
        case 'Y': // 年份全称
            replace = stamp.getFullYear();
            break;
        case 'm': // 有前导零的月份
            var month = stamp.getMonth() + 1;
            if (month < 10) replace = '0' + month;
            else replace = month;
            break;
        case 'd' : // 有前导零的日期
            var date = stamp.getDate();
            if (date < 10) replace = '0' + date;
            else replace = date;
            break;
        case 'H': // 24小时制有前导零的小时数
            var hours = stamp.getHours();
            if (hours < 10) replace = '0' + hours;
            else replace = hours;
            break;
        case 'i': // 有前导零的分钟数
            var minutes = stamp.getMinutes();
            if (minutes < 10) replace = '0' + minutes;
            else replace = minutes;
            break;
        case 's': // 有前导零的秒数
            var seconds = stamp.getSeconds();
            if (seconds < 10) replace = '0' + seconds;
            else replace = seconds;
            break;
        default :
            break;
    }
    return replace;
};

/**
 * 可以存到 storage 的 KEY
 * 便于管理
 *
 * @type {string[]}
 */
var StorageAllowKey = {
    "userInfo" : true,         // 微信用户基本信息
};

module.exports = {

    /**
     * 将异步的wx请求方法promise化
     *
     * @param fn
     * @returns {Function}
     */
    'promise': function (fn) {
        return function (obj = {}) {
            return new Promise(function (resolve, reject) {
                obj.success = function (res) {
                    resolve(res)
                };
                obj.fail = function (res) {
                    reject(res)
                };
                fn(obj);
            })
        }
    },

    // 将Promise对象挂到Util下
    'Promise': Promise,

    /**
     * 总管捕获的错误反馈文本
     *
     * @param err
     * @returns {string}
     */
    error: function(err){
        var _default = '抱歉，网络好像有点问题，请稍候刷新重试';
        var msg = _default;
        if (typeof err == 'string') msg = err;
        if (err == '获取UID失败') msg = _default;
        if (err == '返回的 UID 为空或 undefined') msg = _default;
        if (err == '非法参数(null)') msg = _default;
        return msg
    },

    /**
     * 加载模块方法到页面对象上
     *
     * @param pageObj
     * @returns {*}
     */
    'load':function(pageObj){

        var modules = pageObj.data.modules;

        // 将模块中的方法构造并提取出来
        var item,record,key,func={};
        for(item in modules){
            for(record in modules[item]){
                if (typeof modules[item][record] == 'function'){
                    key = 'modules.'+item+'.'+record;
                    func[key] = modules[item][record];
                }
            }
        }

        // 将提取出来的模块方法合并到pageObj上
        for(item  in func){
            pageObj[item] = func[item]
        }

        return pageObj
    },

    /**
     * 获取用户信息
     *
     * @param force 是否强制发送请求进行更新
     * @returns {*}
     */
    getUserInfo: function (force = false) {
        var expire = 15 * 24 * 60 * 60 * 1000; // 15天
        var userInfo = this.getStorage("userInfo");

        var wxGetUserInfo = this.promise(wx.getUserInfo);
        var reload = false;
        var now = new Date().getTime();

        if (force) reload = true;
        if (userInfo == undefined) reload = true;
        if (now - userInfo.logTime > expire) reload = true;

        if (reload) {
            return wxGetUserInfo().then(function (res) {
                res.logTime = now;
                wx.setStorageSync("userInfo", res);
                return res;
            });
        } else {
            return Promise.resolve(userInfo);
        }
    },

    /**
     * 将时间戳按照时间格式转换成字符串
     *
     * @param timestamp 时间戳
     * @param format    时间格式
     * @returns {string}
     */
    timetostr: function (timestamp, format = 'Y-m-d H:i:s') {

        var placeholder = 'YmdHis';
        var preg = new RegExp('[' + placeholder + ']');
        var stamp = new Date(timestamp);
        var ret = format;

        while (preg.test(ret)) {
            var match = preg.exec(ret); // 抽取出 format 中的每个占位符
            var replace = timeConvert(match[0], stamp); // 根据对应的占位符生成时间文本
            // 对时间字符串进行替换
            var pattern = new RegExp(match[0]);
            ret = ret.replace(pattern, replace);
        }

        return ret;
    },

    /**
     * 获取 Storage 中的数据
     *
     * @param key
     * @returns {*}
     */
    getStorage: function(key){
        if (StorageAllowKey[key]) {
            return wx.getStorageSync(key)
        }
    },

    /**
     * 设置 Storage 中的数据
     * @param key
     * @param data
     * @returns {*}
     */
    setStorage: function(key, data){
        if (StorageAllowKey[key]) {
            return wx.setStorageSync(key, data);
        }
    },

    /**
     * 删除 storage 中的数据
     *
     * @param key
     * @returns {*}
     */
    removeStorage: function(key){
        if (StorageAllowKey[key]) {
            return wx.removeStorageSync(key);
        }
    },

    /**
     * 加载交互简单封装
     *
     * @param title
     */
    loading : function(title = '加载中'){
        wx.showToast({
            title: title,
            icon : 'loading',
            duration : 10000,
            mask : true,
            success : function(){}
        });
    },

    /**
     * 加载交互简单封装
     *
     * @param title
     */
    loaded : function(title = ''){
        wx.hideToast();
        if (title != '') {
            wx.showToast({
                title: title,
                icon: 'success',
                duration: 1500
            });
        }
    },

    /**
     * 提示封装
     * @param content
     * @returns {*}
     */
    notice: function(content){
        var notice = this.promise(wx.showModal);
        var obj = {
            title: '提示',
            content: content,
            confirmText: '知道了',
            showCancel: false
        };
        return notice(obj);
    },

    /**
     * 删除空格
     *
     * @param str
     * @returns {void|string|XML|*}
     */
    trim : function(str){
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }
};
