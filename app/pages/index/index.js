var api = getApp().lib.api;
var timetostr = require('../../utils/utils.js').timetostr;

Page({
	data:{
		tabs:[],
		page: 1,
		// 当值为true时，底部为“加载更多数据”，否则为“没有更多数据”
		noData:true,
		college:[],
		college_index: 0
	},
	/**
	 * 切换学校时完成
	 */
	bindPickerChange: function(e) {
		var that = this;
		var collegeCurrent = e.detail.value>0?that.data.college[e.detail.value]:'';
		api.msg.list(1,10,collegeCurrent)
			.then(function(res){
				var data = res.data.data;
				var timeCurrent = new Date().getTime();
				data.map((item)=>{
					var timeStart = new Date(item.date).getTime()
					var countdown=parseInt((timeStart-timeCurrent)/1000/60/60/24);
					if(countdown < 1){
						countdown = timetostr(timeStart-timeCurrent,'H:i:s')
					}
					item.countdown = '还剩 ' + countdown + ' 天';
				})
				return data;
			})
			.then(function(data){
				that.setData({
					tabs:data,
					college_index: e.detail.value
				})
			})
			.catch(function(err){
				console.log('get data error:'+err.errMsg);
			});
    },
	
	/**
	 * 页面初次渲染完成
	 */
	onReady: function () { 
		var that = this;
		
		//读取学校列表数据

		api.msg.college_list()
			.then(function(res){
				console.log(res.data.data)
				var data = res.data.data;
				var college = Object.keys(data);
				college.unshift(['全部']);
				that.setData({college:college});
				return api.msg.list(1,10,'')
			})
			.then(function(res){
				var data = res.data.data;
				var timeCurrent = new Date().getTime();
				data.map((item)=>{
					var timeStart = new Date(item.date).getTime()
					var countdown=parseInt((timeStart-timeCurrent)/1000/60/60/24);
					if(countdown < 1){
						countdown = timetostr(timeStart-timeCurrent,'H:i:s')
					}
					
					item.countdown = '还剩 ' + countdown + ' 天';
				})
				return data
			})
			.then(function(data){
				that.setData({tabs:data});
			})
			.catch(function(err){
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

		var collegeCurrent = that.data.college_index>0?that.data.college[that.data.college_index]:'';
		api.msg.list(1,10,collegeCurrent)
			.then(function(res){
				var data = res.data.data;
				var timeCurrent = new Date().getTime();
				data.map((item)=>{
					var timeStart = new Date(item.date).getTime()
					var countdown=parseInt((timeStart-timeCurrent)/1000/60/60/24);
					if(countdown < 1){
						countdown = timetostr(timeStart-timeCurrent,'H:i:s')
					}
					
					item.countdown = '还剩 ' + countdown + ' 天';
				})
				return data
			})
			.then(function(data){
				that.setData({tabs:data});
				wx.hideNavigationBarLoading(); 
			})
			.catch(function(err){
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
		var collegeCurrent = that.data.college_index>0?that.data.college[that.data.college_index]:'';
		console.log(collegeCurrent)
		api.msg.list(page+1,10,collegeCurrent)
			.then(function(res){
			
				// 将获取的数据添加到末尾
				var data = res.data.data;
				var timeCurrent = new Date().getTime();
				data.map((item)=>{
					var timeStart = new Date(item.date).getTime()
					var countdown=parseInt((timeStart-timeCurrent)/1000/60/60/24);
					if(countdown < 1){
						countdown = timetostr(timeStart-timeCurrent,'H:i:s')
					}
					
					item.countdown = '还剩 ' + countdown + ' 天';
				})
				return data
			})
			.then(function(data){
				list = list.concat(data);

				page = page + 1;// 更新分页信息
				var noData = data.length == api.defaultPageSize;//判断是否已经到页尾
				that.setData({
					tabs:list,
					page: page,
					noData: noData
				});

				wx.hideNavigationBarLoading();
			})	
			.catch(function(err){

				console.log('无法获取数据:'+err.errMsg)

			})
	 },

	onShow: function () {  }, // 页面显示
	onHide: function () {  }, // 页面隐藏
	onUnload: function () {  }, // 页面卸载
	onShareAppMessage: function () {  },// 用户点击右上角分享
});
