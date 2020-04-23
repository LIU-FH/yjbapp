<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view>
			<view class='header'>
				<image src='../static/logo.png'></image>
			</view>
			<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像、地区等)</text>
			</view>
		
			<button class="cu-btn margin-tb-sm round" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
				授权登录
			</button>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view>
			<form class="padding">
					<view class="cu-form-group">
						<view class="title">手机号</view>
						<input placeholder="请输入手机号" @input="inputPhone" :value="formData.phone" name="input"></input>
					</view>
					<view class="padding-xs"></view>
					<view class="cu-form-group">
						<view class="title">验证码</view>
						<input placeholder="请输入验证码" @input="inputCode" :value="formData.code" name="input"></input>
						<button v-if="time > 0" disabled class='cu-btn'>{{time}}s重新发送</button>
						<button v-else @tap="getCode" class='cu-btn'>发送验证码</button>
					</view>
				</form>
			<view class="padding-lr margin-top-xl">
				<button @tap="toSubmit" class="cu-btn bg-red shadow-blur round lg response ">登录</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	let bindPhoneT;
	export default {
		data() {
			return {
				formData:{
					phone:'',
					code:'',
				},
				time:0
			};
		},
		onLoad: function(option) {
			let timestamp  = parseInt(uni.getStorageSync('bind-phone-disabled-time')) - parseInt(new Date().getTime()/1000)
			if( timestamp > 0 ){
				this.time = timestamp
				this.initBindPhoneT()
			}
		},
		methods: {
			wxGetUserInfo() {
				let that = this;
	
				let UserInfo = uni.getStorageSync('getUserInfo');
				if (UserInfo) {
					that.$minApi
						.wxLogin(UserInfo)
						.then(res => {
							if(!res.error){
								this.toUser(res)
							}
						})
						.catch(err => {
							console.log(err);
						});
					return true;
				}
	
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						uni.setStorageSync('getUserInfo', infoRes);
						that.$minApi
							.wxLogin(infoRes)
							.then(res => {
								if(!res.error){
									this.toUser(res)
								}
							})
					},
					fail(res) {}
				});
			},
		getCode() {
			let errMsg = '';
			if(!this.formData.phone){
				errMsg = '请输入手机号'
			}
			if(errMsg){
				uni.showToast({
					icon: 'none',
					title: errMsg,
					duration: 2000
				});
				return false;
			}
			
			this.$minApi
				.phoneCode(this.formData)
				.then(res => {
					if(!res.error){
						this.time = 60
						this.initBindPhoneT()
						uni.showToast({
							title: "验证码发送成功",
							duration: 2000
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		initBindPhoneT(){
			let that = this
			bindPhoneT = setInterval(function(){
				that.time = that.time - 1
				if(that.time <= 0){
					clearInterval(bindPhoneT)
				}
				uni.setStorageSync('bind-phone-disabled-time', parseInt(new Date().getTime()/1000) + that.time);
			},1000)
		},
		toSubmit(){
			let errMsg = '';
			if(!this.formData.phone){
				errMsg = '请输入手机号'
			}else if(!this.formData.code){
				errMsg = '请输入验证码'
			}
			if(errMsg){
				uni.showToast({
					icon: 'none',
					title: errMsg,
					duration: 2000
				});
				return false;
			}
			this.$minApi
				.phoneLogin(this.formData)
				.then(res => {
					if(!res.error){
						this.toUser(res)
					}
				});
		},
		toUser(res){
			uni.setStorageSync('access_token', res.token);
			uni.setStorageSync('userInfo', res.userInfo);
			uni.showToast({
				title: "登录成功",
				duration: 2000
			});
			setTimeout(function(){
				uni.switchTab({
				    url: '/pages/user/index'
				});
			},1500)
		},
		inputPhone(e) {
			this.formData.phone = e.detail.value
		},
		inputCode(e) {
			this.formData.code = e.detail.value
		},
		},
		onBackPress() {
			clearInterval(bindPhoneT)
		}
	};
</script>

<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
