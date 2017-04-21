var WxParse = require('../../lib/wxparse/wxParse.js');

Page({
    data:{},

    /**
	 * 详情页面初次渲染完成
	 */
    onLoad:function(){
        var that = this;

        //获取storage中存储的宣讲会详情数据
        var detail = wx.getStorageSync('detail');
        //当职位信息为'undefined'时，不显示职位信息内容
        detail.display_position = (detail.position == undefined)?false:true;
        var article = '<div style="text-align:center;margin-top:10px;"><h1 style="color:red;">wxParse-微信小程序富文本解析组件</h1><h2 >支持Html及markdown转wxml可视化</h2></div>'

        /**
        * WxParse.wxParse(bindName , type, data, target,imagePadding)
        * 1.bindName绑定的数据名(必填)
        * 2.type可以为html或者md(必填)
        * 3.data为传入的具体数据(必填)
        * 4.target为Page对象,一般为this(必填)
        * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
        */
        WxParse.wxParse('article', 'html', article, that);
        
        that.setData(detail)
    }
})