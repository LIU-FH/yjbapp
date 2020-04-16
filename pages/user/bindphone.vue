<template>
	<view>
		<form >
				<view class="padding">绑定手机，请输入有效手机号！</view>
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
			<button @tap="toSubmit" class="cu-btn bg-red shadow-blur round lg response ">绑定</button>
		</view>
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
			}
		},
		onLoad: function(option) {
			let timestamp  = parseInt(uni.getStorageSync('bind-phone-disabled-time')) - parseInt(new Date().getTime()/1000)
			if( timestamp > 0 ){
				this.time = timestamp
				this.initBindPhoneT()
			}
		},
		methods: {
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
						this.time = 60
						this.initBindPhoneT()
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
					.phoneBind(this.formData)
					.then(res => {
						uni.showToast({
							title: "绑定成功",
							duration: 2000
						});
						setTimeout(function(){
							uni.navigateBack({
							    delta: 1
							});
						},2000)
					})
					.catch(err => {
						console.log(err);
					});
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
	}
</script>

<style>

</style>
