<template>
	<view style="margin-bottom: 130upx;">
		<view @tap="toAddress" class="cu-card">
			<view v-if="details.address_name && details.address_tel && details.address_details" class="cu-item padding">
				<view>
					<text class="cuIcon-edit"></text>
					<text class="margin-lr-sm">{{ details.address_name }}</text>
					<text>{{ details.address_tel }}</text>
				</view>
				<view class="text-cut margin-top-sm">{{ details.address_details }}</view>
			</view>
			<view v-else class="cu-item padding">选择收货地址</view>
		</view>
		<view class="cu-card">
			<view class="cu-item cu-list">
				<view class="cu-item flex align-center padding" v-for="(item, index) in details.details" :key="index">
					<view class="cu-avatar xl margin-right-sm flex-none" :style="'background-image:url(' + globalData.file_url + item.img + ');'"></view>
					<view class="width-full">
						<view style="height: 90upx;" class="text-cut">{{ item.title }}</view>
						<view class="flex align-center justify-between">
							<view class=" text-price text-red text-lg">{{ item.price }}</view>
							<view class="text-gray">x {{ item.count }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu card-menu margin-top">
			<view class="cu-item">
				<view class="content">商品总数</view>
				<view class="action">x {{ details.count }}</view>
			</view>
			<view class="cu-item">
				<view class="content">商品总价</view>
				<view class="action text-price">{{ details.amount_total }}</view>
			</view>
			<view v-if="details.wallet_balance > 0" class="cu-item">
				<view class="content">
					钱包抵扣
					<text class="text-sm text-red margin-left-xs">我的余额：{{ details.wallet_balance }}元</text>
				</view>
				<view class="action ">
					<text v-if="isSwitch" class="margin-right-xs">-{{ balance }}元</text>
					<switch @change="SwitchChange" :class="isSwitch ? 'checked' : ''" :checked="isSwitch"></switch>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">帮主折扣（{{ details.discount * 100 }}%）</view>
				<view class="action text-price">{{ details.discount_amount.toFixed(2) }}</view>
			</view>
			<view class="cu-item">
				<view class="content">实付金额</view>
				<view class="action text-price">{{ details.amount - balance }}</view>
			</view>
			<view class="cu-form-group "><textarea maxlength="200" :value="remark" @input="inputRemark" placeholder="备注"></textarea></view>
		</view>

		<view class="cu-bar bg-white tabbar border shop foot">
			<view class="flex-sub padding-left">
				支付：
				<text class="text-xl text-red text-price">{{ details.amount - balance }}</text>
			</view>
			<view @tap="doPay" class="bg-red submit" style="flex: 1;">立即支付</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			globalData: {},
			params: {},
			details: {},
			balance: 0,
			isSwitch: false,
			remark: ''
		};
	},
	onLoad: function(option) {
		this.globalData = getApp().globalData;
		this.params = {
			goods: option.goods,
			goods_group: option.goods_group,
			cart: option.cart
		};
		this.loadData();
	},
	methods: {
		loadData() {
			this.$minApi
				.orderReady(this.params)
				.then(res => {
					this.details = res;
				})
				.catch(err => {
					console.log(err);
				});
		},
		doPay() {
			let errMsg = '';
			if (!(this.details.address_name && this.details.address_tel && this.details.address_details)) {
				errMsg = '请选择收货地址';
			}
			if (errMsg) {
				uni.showToast({
					icon: 'none',
					title: errMsg,
					duration: 2000
				});
				return false;
			}
			this.$minApi
				.orderAdd({
					params: this.params,
					balance: this.balance,
					remark: this.remark,
					address_name: this.details.address_name,
					address_tel: this.details.address_tel,
					address_details: this.details.address_details
				})
				.then(res => {
					if(res.error){
						return false
					}
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: String(Date.now()),
						nonceStr: res.nonce_str,
						package: 'prepay_id=' + res.prepay_id,
						signType: 'MD5',
						paySign: res.sign,
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							console.log('fail:' + JSON.stringify(err));
						}
					});
					uni.redirectTo({
						url: '/pages/order/details?id=' + res.order_id
					});
				})
				.catch(err => {
					console.log(err);
				});
		},
		toAddress() {
			uni.navigateTo({
				url: '/pages/user/address/index?order=1'
			});
		},
		SwitchChange(e) {
			this.isSwitch = e.detail.value;
			if (this.isSwitch) {
				this.balance = this.details.wallet_balance > this.details.amount ? this.details.amount : this.details.wallet_balance;
			} else {
				this.balance = 0;
			}
		},
		inputRemark(e) {
			this.remark = e.detail.value;
		},
		toGoodsDetails(id) {
			uni.navigateTo({
				url: '/pages/goods/details?id=' + id + '&keyword=' + this.globalData.userInfo.keyword
			});
		}
	},
	onShow() {
		let details = uni.getStorageSync('address-select');
		if (details) {
			this.details.address_name = details.name;
			this.details.address_tel = details.tel;
			this.details.address_details = details.city + ',' + details.details;
			uni.removeStorageSync('address-select');
		}
	}
};
</script>

<style></style>
