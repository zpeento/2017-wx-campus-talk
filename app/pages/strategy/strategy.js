var api = getApp().lib.api;
var timetostr = require('../../utils/utils.js').timetostr;

var func = {};

Page({
	data:{
		noData:false,
		tabs:[{
			title:'xxx公司面试全过程经验',
			selected:true,
			job:'前端开发',
			time:'2017-04-30'
		},{
			title:'xxx公司面试全过程经验',
			selected:true,
			job:'前端开发',
			time:'2017-04-30'
		},{
			title:'xxx公司面试全过程经验',
			selected:false,
			job:'前端开发',
			time:'2017-04-30'
		},{
			title:'xxx公司面试全过程经验',
			selected:false,
			job:'前端开发',
			time:'2017-04-30'
		},{
			title:'xxx公司面试全过程经验',
			selected:false,
			job:'前端开发',
			time:'2017-04-30'
		},{
			title:'xxx公司面试全过程经验',
			selected:true,
			job:'前端开发',
			time:'2017-04-30'
		}]
	},

	/**
	 * 下拉刷新
	 */
	onPullDownRefresh:function(){  },

	/**
	 * 上拉加载
	 */
	onReachBottom: function () {  },
	/**
	 * 点击tab后显示该招聘会的具体详情
	 */
	bindViewTap: function() {  },

	onLoad: function () {  }, // 页面加载
	onShow: function () {  }, // 页面显示
	onHide: function () {  }, // 页面隐藏
	onUnload: function () {  }, // 页面卸载
	onShareAppMessage: function () {  },// 用户点击右上角分享
});
