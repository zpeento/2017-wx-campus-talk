Page({
    data:{},

    /**
	 * 详情页面初次渲染完成
	 */
    onLoad:function(option){
        var that = this;
        //当职位信息为'暂无信息'时，不显示职位信息内容
        var display_position = option.position == '暂无信息' ?false:true;
        
        that.setData({
            title:option.title,
            time:option.date,
            location:option.location,
            position:option.position,
            innerhtml:option.innerhtml,
            display_position:display_position
        })
    }
})