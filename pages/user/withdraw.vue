<template>
	<view>
		<radio-group class="block" @change="RadioChange">
			<view class="cu-list menu-avatar margin-top">
				<view class="cu-item">
					<view class="cu-avatar round lg bg-white" style="background-image:url(../../static/img/pay-wx.png);"></view>
					<view class="content">
						微信提现
					</view>
					<view class="action">
						<radio :class="formData.type == '1' ? 'checked':''" :checked="formData.type == '1' ? true : false" value="1"></radio>
					</view>
				</view>
				<view class="cu-item">
					<view class="cu-avatar round lg bg-white" style="background-image:url(../../static/img/pay-bank.png);"></view>
					<view class="content">
						银行卡提现
					</view>
					<view class="action">
						<radio :class="formData.type == '2' ?'checked':''" :checked="formData.type == '2' ? true : false" value="2"></radio>
					</view>
				</view>
				</view>
		</radio-group>
		
			<form v-if="formData.type == 1">
				<view class="padding">提现到当前微信号</view>
				<view class="cu-form-group">
					<view class="title">提现金额</view>
					<input :placeholder="'可提现金额：'+details.balance" @input="InputAmount" :value="formData.amount" name="input"></input>
					<button @tap="sumAll" class='cu-btn'>全部提现</button>
				</view>
				<view class="padding text-sm">
					<view>提现申请成功后，将在1-5个工作日内到账</view>
					<view>每天可提现一次</view>
				</view>
			</form>
			<form v-if="formData.type == 2">
				<view class="padding">请输入银行卡账号</view>
				<view class="cu-form-group">
					<view class="title">卡号</view>
					<input placeholder="请输入银行卡号" @input="InputBankCard" :value="formData.bank_card" name="input"></input>
				</view>
				<view class="padding-xs"></view>
				<view class="cu-form-group">
					<view class="title">手机号</view>
					<input placeholder="请输入银行预留手机号" @input="InputTel" :value="formData.tel"  name="input"></input>
				</view>
				<view class="padding-xs"></view>
				<view class="cu-form-group">
					<view class="title">姓名</view>
					<input placeholder="请输入银行卡姓名" @input="InputName" :value="formData.name"  name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">开户行</view>
					<input placeholder="请输入开户行" @input="InputBankAddress" :value="formData.bank_address"  name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">提现金额</view>
					<input :placeholder="'可提现金额：'+details.balance" @input="InputAmount" :value="formData.amount"  name="input"></input>
					<button @tap="sumAll" class='cu-btn'>全部提现</button>
				</view>
				<view class="padding text-sm">
					<view>提现申请成功后，将在1-5个工作日内到账</view>
					<view>每天可提现一次</view>
				</view>
			</form>
			<view class="padding">
				<button @tap="onSubmit" class="cu-btn bg-green shadow-blur round lg response ">提现</button>
			</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			globalData: {},
			details:{},
			formData:{
				type:"1",
				amount:'',
				name:'',
				tel:'',
				bank_card:'',
				bank_address:'',
			}
		};
	},
	onLoad() {
		this.globalData = getApp().globalData;
		this.loadData();
	},
	methods: {
		loadData() {
			this.$minApi
				.wallet()
				.then(res => {
					this.details = res.data;
				})
				.catch(err => {
					console.log(err);
				});
		},
		onSubmit(){
			let errMsg = '';
			this.formData.type = parseInt(this.formData.type)
			if(this.formData.type == 2){
				if(!this.formData.bank_card){
					errMsg = "请输入银行卡号"
				}else if(!this.formData.tel){
					errMsg = "请输入银行预留手机号"
				}else if(!this.formData.name){
					errMsg = "请输入银行卡姓名"
				}else if(!this.formData.bank_address){
					errMsg = "请输入开户行"
				}
			}
			if(!errMsg){
				this.formData.amount = this.formData.amount ? parseInt(this.formData.amount) : 0;
				if(this.formData.amount <= 0){
					errMsg = "提现金额必须大于0"
				}else if(this.formData.amount > this.details.balance){
					errMsg = "提现金额大于当前余额"
				}
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
				.withdrawAdd(this.formData)
				.then(res => {
					uni.showToast({
						title: "提交成功",
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
		RadioChange(e) {
			this.formData.type = e.detail.value
		},
		sumAll(){
			this.formData.amount = this.details.balance
		},
		InputAmount(e) {
			this.formData.amount = e.detail.value
		},
		InputName(e) {
			this.formData.name = e.detail.value
		},
		InputTel(e) {
			this.formData.tel = e.detail.value
		},
		InputBankCard(e) {
			this.formData.bank_card = e.detail.value
		},
		InputBankAddress(e) {
			this.formData.bank_address = e.detail.value
		},
	}
};
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
