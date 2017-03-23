Page({
	data:{
		tabs:[{
			company:"中国能源建设集团华南电力试验研究院有限公司",
			date:"2017-03-15",
			weekDay:"星期三",
			today:"今天",
			time:"16:00",
			university:"华南理工大学",
			location:"五山校区就业指导中心一号报告厅"
		},{
			company:"中国能源建设集团华南电力试验研究院有限公司",
			date:"2017-03-15",
			weekDay:"星期三",
			today:"今天",
			time:"16:00",
			university:"华南理工大学",
			location:"五山校区就业指导中心一号报告厅"
		},{
			company:"中国能源建设集团华南电力试验研究院有限公司",
			date:"2017-03-15",
			weekDay:"星期三",
			today:"今天",
			time:"16:00",
			university:"华南理工大学",
			location:"五山校区就业指导中心一号报告厅"
		},{
			company:"中国能源建设集团华南电力试验研究院有限公司",
			date:"2017-03-15",
			weekDay:"星期三",
			today:"今天",
			time:"16:00",
			university:"华南理工大学",
			location:"五山校区就业指导中心一号报告厅"
		},{
			company:"中国能源建设集团华南电力试验研究院有限公司",
			date:"2017-03-15",
			weekDay:"星期三",
			today:"今天",
			time:"16:00",
			university:"华南理工大学",
			location:"五山校区就业指导中心一号报告厅"
		},{
			company:"中国能源建设集团华南电力试验研究院有限公司",
			date:"2017-03-15",
			weekDay:"星期三",
			today:"今天",
			time:"16:00",
			university:"华南理工大学",
			location:"五山校区就业指导中心一号报告厅"
		}]
	},
	onPullDownRefresh:function(){
		//do something
		console.log('haha');
		wx.showNavigationBarLoading() //在标题栏中显示加载
		wx.stopPullDownRefresh()
		// wx.request({});
		wx.hideNavigationBarLoading()
	},

	onReady: function () {  }, // 页面初次渲染完成
	onShow: function () {  }, // 页面显示
	onHide: function () {  }, // 页面隐藏
	onUnload: function () {  }, // 页面卸载
	onReachBottom: function () {  }, // 页面上拉触底事件的处理函数
	onShareAppMessage: function () {  },// 用户点击右上角分享

});
