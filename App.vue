<script>
	import Vue from 'vue'
	export default {
		globalData: {
			api_url: 'http://www.laravel.local',
			file_url: 'http://www.laravel.local/storage/',
			userInfo: {},
			cart_count: 0
		},
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					}
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			});


			// uni.login({
			// 	provider: 'weixin',
			// 	success: function(loginRes) {
			// 		let code = loginRes.code;
			// 		uni.getUserInfo({
			// 			provider: 'weixin',
			// 			success: function(infoRes) {
			// 				infoRes.code = code
			// 				this.$minApi
			// 					.login(infoRes)
			// 					.then(res => {
			// 						getApp().globalData.userInfo = res.data
			// 						uni.setStorageSync('access_token', res.token);
			// 					});
			// 			}
			// 		});
			// 	},
			// });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import 'colorui/main.css';
	@import 'colorui/icon.css';
</style>
