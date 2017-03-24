var get_list = getApp().lib.api.msg.list;


Page({
	data:{
		tabs:[]
	},
	onPullDownRefresh:function(){
		var that = this;
		wx.showNavigationBarLoading() //在标题栏中显示加载
		wx.stopPullDownRefresh()
		//从后台获取数据
		get_list(1,2).then(
			function(res){
				//当数据发生变化时
				if(that.data.tabs.length != res.data.data.length){
					that.setData({
						tabs:res.data.data
					})
				}else{
					console.log('无数据更新')
				}
			},
			function(res){
				console.log('无法获取数据:'+res)
			}
		);
		wx.hideNavigationBarLoading()
	},

	onReady: function () { 
		var that = this;
		//读取列表数据并输出
		get_list(1,2).then(
			function(res){
				that.setData({
					tabs:res.data.data
				})
		 	},
			function(res){
				console.log('无法获取数据'+res)
			}
		 );
	}, // 页面初次渲染完成
	onShow: function () {  }, // 页面显示
	onHide: function () {  }, // 页面隐藏
	onUnload: function () {  }, // 页面卸载
	onReachBottom: function () {  }, // 页面上拉触底事件的处理函数
	onShareAppMessage: function () {  },// 用户点击右上角分享
});
