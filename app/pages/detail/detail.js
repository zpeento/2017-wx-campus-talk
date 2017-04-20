Page({
    data:{},

    /**
	 * 详情页面初次渲染完成
	 */
    onLoad:function(){
        var that = this;
        //获取storage中存储的宣讲会详情数据
        var data = wx.getStorageSync('detail');
        //当职位信息为'undefined'时，不显示职位信息内容
        data.display_position = (data.position == undefined)?false:true;
        
        that.setData(data)
    }
})