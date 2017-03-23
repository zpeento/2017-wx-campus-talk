var Loading = function(){

    var init = function(){
        return {
            text: '正在加载',
            noDataText: '暂无数据',
            noData: false,
            show: true
        }
    };

    return {

        loading: function(text){
            var ret = init();
            ret['text'] = text || ret.text;
            ret['show'] = true;
            return ret;
        },

        loaded: function(){
            var ret = init();
            ret['text'] = '';
            ret['show'] = false;
            return ret;
        },

        noData: function(text){
            var ret = init();
            ret['noData'] = true;
            ret['noDataText'] = text || ret.noDataText;
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
module.exports = { create : function(){ return new Loading();} };