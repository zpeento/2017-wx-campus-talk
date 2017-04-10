Page({
    data:{
        company:'珠海金山办公软件',
        time:'2017-04-09 14:00',
        location:'华南师范大学石牌桥校区桃李园'
    },

    /**
	 * 详情页面初次渲染完成
	 */
    onLoad:function(option){
        console.log(option.company)
    }
})