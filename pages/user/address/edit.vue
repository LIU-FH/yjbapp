<template>
	<view>
		<view class="margin-top"><form>
			<view class="cu-form-group">
				<view class="title">收货人</view>
				<input placeholder="姓名" name="input" @input="inputName" :value="details.name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input placeholder="收货人联系电话" name="input" @input="inputTel" :value="details.tel"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">选择地区</view>
				<picker mode="region" @change="RegionChange" :value="details.city">
					<view class="picker">
						{{details.city.join(',')}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="-1" @input="inputDetails" placeholder="详细地址" :value="details.details"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">设置为默认收货地址</view>
				<switch @change="SwitchChange" :class="details.default ? 'checked':'' " :checked="details.default ? true:false"></switch>
			</view>
			</form>
			</view>
		<view class="padding margin-top">
			<button @tap="OnSubmit" class="cu-btn bg-red shadow-blur round lg response ">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				details:{
					name:'',
					tel:'',
					city:['北京市','北京市','东城区'],
					details:'',
					default:0,
				},
			};
		},
		onLoad: function() {
			let details = uni.getStorageSync('address-edit');
			if(details){
				details.city = details.city.split(',')
				details.default = details.default == 1 ? true :false
				this.details = details
				uni.removeStorageSync('address-edit');
			}
		},
		methods: {
			OnSubmit() {
				let details = JSON.parse(JSON.stringify(this.details))
				details.city = details.city.join(',')
				details.default = details.default ? 1 : 0
				let errMsg = '';
				if(!details.name){
					errMsg = "请输入姓名"
				}else if(!details.tel){
					errMsg = "请输入手机号"
				}else if(!details.tel){
					errMsg = "请选择城市"
				}else if(!details.details){
					errMsg = "请输入详情地址"
				}
				if(errMsg){
					uni.showToast({
						icon: 'none',
						title: errMsg,
						duration: 2000
					});
					return false;
				}
				if(details.id > 0){
					this.$minApi
						.addressEdit(details)
						.then(res => {
							uni.setStorageSync('address-load', 1);
							uni.navigateBack({
							    delta: 1
							});
						})
						.catch(err => {
							console.log(err);
						});
				}else {
					this.$minApi
						.addressAdd(details)
						.then(res => {
							uni.setStorageSync('address-load', 1);
							uni.navigateBack({
							    delta: 1
							});
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			
			RegionChange(e) {
				this.details.city = e.detail.value
			},
			SwitchChange(e) {
				this.details.default = e.detail.value
			},
			inputName(e) {
				this.details.name = e.detail.value
			},
			inputTel(e) {
				this.details.tel = e.detail.value
			},
			inputDetails(e) {
				this.details.details = e.detail.value
			},
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
