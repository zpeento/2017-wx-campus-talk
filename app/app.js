App({

	// DEBUG - INFO - WARN - ERROR - FATAL
	logLevel : 'ERROR',

	lib : {
		utils : require('utils/utils.js'), // 工具函数库
		api : require('utils/api.js'), // api接口
		log : require('utils/log.js'), // 日志工具
	},

	modules : {
		"Loading" : require('modules/loading/loading.js'), // 组件 - 加载状态
		"MsgPage" : require('modules/msgPage/msgPage.js') // 组件 - 消息页
	},

	onLaunch: function () {},// 当小程序初始化完成
	onShow: function () {}, // 当小程序启动，或从后台进入前台显示
	onHide: function () {},// 当小程序从前台进入后台
	onError: function (msg) {},// 当小程序发生脚本错误，或者 api 调用失败

});