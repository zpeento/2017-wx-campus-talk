var api = getApp().lib.api;
var timetostr = require('../../utils/utils.js').timetostr;

var func = {

    /**
     * 构造倒计时字符串
     *
     * @param timeString
     * @returns {Number}
     */
    countdown: function(timeString){

		var countdown = '';
        var timeCurrent = new Date().getTime();
		
        var timeStart = new Date(timeString.replace(/-/g,"/")).getTime();
        var day = parseInt((timeStart-timeCurrent)/1000/60/60/24);
        var hour = parseInt((timeStart-timeCurrent)/1000/60/60);
        var minute = parseInt((timeStart-timeCurrent)/1000/60);

		if (minute < 15) countdown = "即将开始";
        else if (hour < 1) countdown = minute + "分钟后开始";
        else if (day < 1) countdown = '还剩 ' + hour + ' 小时';
		else if (day > 7) countdown = '还剩' + parseInt(day/7) + '个多星期';
        else countdown = '还剩 ' + day + ' 天';

        return countdown
    }

};

Page({
	data:{
		tabs:[],
		page: 1,
		// 当值为true时，底部为“加载更多数据”，否则为“没有更多数据”
		noData:true,
		college:[],
		// 记录当前选中的学校
		selected: {
			index: 0,
			college: ''
		}
	},
	
	/**
	 * 页面初次渲染完成
	 */
	onReady: function () { 
		var that = this;
		
		//读取学校列表数据
		api.msg.college_list()
			.then(function(res){
				var data = res.data.data;
				var college = Object.keys(data);
				college.unshift(['全部']);
				that.setData({college:college});
				return api.msg.list()
			})
			.then(function(res){
				var data = res.data.data;
				data.map((item)=>{
					item.countdown = func.countdown(item.date);
				});
				that.setData({tabs:data});
			})
			.catch(function(err){
				console.error(err);
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
		var college = this.data.selected.college;
		api.msg.list(1,10,college)
			.then(function(res){
				var data = res.data.data;
				data.map((item)=>{
					item.countdown = func.countdown(item.date);
				});
				that.setData({tabs:data});
				wx.hideNavigationBarLoading(); 
			})
			.catch(function(err){
				console.err(err);
			});
	},

	/**
	 * 上拉加载
	 */
	onReachBottom: function () { 
		var that = this;
		var page = this.data.page;
		var list = this.data.tabs;
		var college = this.data.selected.college;

		api.msg.list(page+1,10,college)
			.then(function(res){
			
				// 将获取的数据添加到末尾
				var data = res.data.data;
				data.map((item)=>{
					item.countdown = func.countdown(item.date);
				});
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
				console.error(err);
			})
	 },

	/**
	 * 切换学校时完成
	 */
	bindPickerChange: function(e) {
		var that = this;
		var college = e.detail.value>0?that.data.college[e.detail.value]:'';
		api.msg.list(1,10,college)
			.then(function(res){
				var data = res.data.data;
				data.map((item)=>{
					item.countdown = func.countdown(item.date);
				});
				that.setData({
					tabs:data,
					selected:{
						index: e.detail.value,
						college: college
					}
				})
			})
			.catch(function(err){
				console.error(err);
			});
	},

	/**
	 * 点击tab后显示该招聘会的具体详情
	 */
	bindViewTap: function(e) {
		//保留当前页面跳转到应用内的某个页面
		wx.navigateTo({
			url: '../detail/detail'
		})
	},
	onShow: function () {  }, // 页面显示
	onHide: function () {  }, // 页面隐藏
	onUnload: function () {  }, // 页面卸载
	onShareAppMessage: function () {  },// 用户点击右上角分享
});
