var MsgPage = function(){

    var init = function(){
        return {
            "icon" : "success",
            "title": "操作成功",
            "content": "",
            "primary": "返回首页",
            "bindPrimaryTap": function(){
                wx.switchTab({ url: "/pages/index/index"})
            },
            "default": "返回上一页",
            "bindDefaultTap": function(){},
            "show": false
        }
    };

    return {

        success: function(text){
            var ret = init();
            ret['content'] = text;
            ret['show'] = true;
            return ret;
        },

        fail: function(text){
            var ret = init();
            ret['icon'] = 'warn';
            ret['title'] = '操作失败';
            ret['content'] = text;
            ret['show'] = true;
            return ret;
        },

        info: function(text){
            var ret = init();
            ret['icon'] = 'info';
            ret['title'] = '提示';
            ret['content'] = text;
            ret['show'] = true;
            return ret;
        },

        show: function(){
            var ret = init();
            ret['show'] = true;
            return ret;
        },

        hide: function(){
            var ret = init();
            ret['show'] = false;
            return ret;
        },

        load: function(){
            return init();
        }

    }

};
module.exports = { create : function(){ return new MsgPage();} };