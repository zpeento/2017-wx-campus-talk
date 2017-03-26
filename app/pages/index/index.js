var get_list = getApp().lib.api.msg.list;
var pageSize = 10;

Page({
	data:{
		tabs:[]
	},
	onPullDownRefresh:function(){
		var that = this;
		var dataset =  that.data.tabs;
		wx.showNavigationBarLoading() //在标题栏中显示加载
		wx.stopPullDownRefresh()
		
		//从后台获取数据
		get_list(1,pageSize+5).then(
			function(res){
				//更新的条目数
				var updateSize = res.data.data.length-dataset.length;
				//当数据发生变化时
				if(updateSize>0){
					res.data.data.slice(pageSize).map((value)=>{
						dataset.unshift(value)
					})
					//页面的条目数更新
					pageSize += updateSize
					that.setData({
						tabs:dataset
					})
				}else{
					console.log('无数据更新')
				}
			},
			function(err){
				console.log('无法获取数据:'+err)
			}
		);
		wx.hideNavigationBarLoading()
	},

	onReady: function () { 
		var that = this;
		//读取列表数据并输出
		get_list(1,10).then(
			function(res){
				console.log(res.errMsg)
				that.setData({
					tabs:res.data.data
				})
		 	},
			function(err){
				console.log('get data error:'+err.data)
			}
		 );
	}, // 页面初次渲染完成
	onShow: function () {  }, // 页面显示
	onHide: function () {  }, // 页面隐藏
	onUnload: function () {  }, // 页面卸载
	onReachBottom: function () {  }, // 页面上拉触底事件的处理函数
	onShareAppMessage: function () {  },// 用户点击右上角分享
});
