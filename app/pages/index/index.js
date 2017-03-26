var api = getApp().lib.api;

Page({

	data:{
		tabs:[],
		page: 1,
		// 当值为true时，底部为“加载更多数据”，否则为“没有更多数据”
		noData:true
	},

	/**
	 * 页面初次渲染完成
	 */
	onReady: function () { 
		var that = this;

		//读取列表数据并输出
		api.msg.list().then(function(res){
			that.setData({tabs:res.data.data});
		}).catch(function(err){
			console.log('get data error:'+err.errMsg);
		});
	},

	/**
	 * 下拉刷新
	 */
	onPullDownRefresh:function(){
		var that = this;
		wx.showNavigationBarLoading(); //在标题栏中显示加载
		wx.stopPullDownRefresh();

		//刷新数据
		api.msg.list().then(function(res){
			wx.hideNavigationBarLoading();
			// 恢复分页信息
			that.setData({
				page: 1,
				noData: false,
				tabs:res.data.data
			});
		}).catch(function(err){
			console.log('get data error:'+err.errMsg);
		});
	},

	/**
	 * 上拉加载
	 */
	onReachBottom: function () { 
		var that = this;
		var page = this.data.page;
		var list = this.data.tabs;

		api.msg.list(page+1).then(function(res){

			// 将获取的数据添加到末尾
			var data = res.data.data;
			list = list.concat(data);
			that.setData({tabs:list});

			page = page + 1;// 更新分页信息
			var noData = data.length == api.defaultPageSize;//判断是否已经到页尾
			that.setData({
				page: page,
				noData: noData
			});

			wx.hideNavigationBarLoading();

		}).catch(function(err){

			console.log('无法获取数据:'+err.errMsg)

		})
	 },

	onShow: function () {  }, // 页面显示
	onHide: function () {  }, // 页面隐藏
	onUnload: function () {  }, // 页面卸载
	onShareAppMessage: function () {  },// 用户点击右上角分享
});
