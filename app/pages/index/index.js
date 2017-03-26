var get_list = getApp().lib.api.msg.list;
var pageSize = 10;

//data.more:当值为true时，底部为“加载更多数据”，否则为“没有更多数据”

Page({
	data:{
		tabs:[],
		more:true
	},
	//下拉刷新
	onPullDownRefresh:function(){
		var that = this;
		wx.showNavigationBarLoading() //在标题栏中显示加载
		wx.stopPullDownRefresh()
		
		//刷新数据
		get_list(1,10).then(
			function(res){
				console.log(res.errMsg)
				that.setData({
					tabs:res.data.data
				})
				pageSize = 10;
		 	},
			function(err){
				console.log('get data error:'+err.errMsg)
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
				console.log('get data error:'+err.errMsg)
			}
		 );
	}, // 页面初次渲染完成
	onShow: function () {  }, // 页面显示
	onHide: function () {  }, // 页面隐藏
	onUnload: function () {  }, // 页面卸载
	//上拉加载
	onReachBottom: function () { 
		var that = this;
		var dataset =  that.data.tabs;
		get_list(1,pageSize+5).then(
			function(res){
				console.log(res.errMsg)
				//更新的条目数
				var updateSize = res.data.data.length-dataset.length;
				//当数据条数发生变化时
				if(updateSize>0){
					var dataSetUpdate = dataset.concat(res.data.data.slice(pageSize))
					//页面的条目数更新
					pageSize += updateSize
					that.setData({
						tabs:dataSetUpdate
					})
				}else{
					//当数据条数不变时更改底部信息
					that.setData({
						more:false
					})
				}
			},
			function(err){
				console.log('无法获取数据:'+err.errMsg)
			}
		);
		wx.hideNavigationBarLoading()
	 }, // 页面上拉触底事件的处理函数
	onShareAppMessage: function () {  },// 用户点击右上角分享
});
