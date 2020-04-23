<template>
	<view class="margin-bottom">
		<view class="cu-card">
			<view class="cu-item padding">
				<view>
					<text class="cuIcon-edit"></text>
					<text class="margin-lr-sm">{{ details.address_name }}</text>
					<text>{{ details.address_tel }}</text>
				</view>
				<view class="text-cut margin-top-sm">{{ details.address_details }}</view>
			</view>
		</view>
		<view class="cu-card">
			<view class="cu-item cu-list">
				<view @tap="toGoodsDetails(item.id)" class="cu-item flex align-center padding" v-for="(item, index) in details.details" :key="index">
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
			<view class="cu-item">
				<view class="content">钱包抵扣</view>
				<view class="action ">
					<text class="margin-right-xs">-{{ details.balance }}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">帮主折扣（{{ details.discount * 100 }}%）</view>
				<view class="action text-price">{{ details.discount_amount }}</view>
			</view>
			<view class="cu-item">
				<view class="content">实付金额</view>
				<view class="action text-price">{{ details.amount }}</view>
			</view>
			<view class="cu-form-group "><textarea maxlength="200" :value="details.remark" placeholder="备注"></textarea></view>
		</view>
		<view class="cu-card">
			<view class="cu-item shadow">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">订单编号：{{ details.order_no }}</view>
				</view>
				<view class="cu-list">
					<view class="cu-item padding">
						<view class="flex align-center justify-between">
							<view>{{ details.status_text }}</view>
							<view v-if="details.status === 0">
								<button @tap="editStatus(-7)" class="cu-btn line-red sm margin-right">取消订单</button>
								<button @tap="doPay" class="cu-btn bg-red sm">立即支付</button>
							</view>
							<view v-else-if="details.status === 1">
								<button @tap="editStatus(-1)" class="cu-btn line-red sm margin-right">退款申请</button>
								<button @tap="editStatus(1)" class="cu-btn bg-red sm">提醒发货</button>
							</view>
							<view v-else-if="details.status === 2">
								<button @tap="editStatus(-4)" class="cu-btn line-red sm margin-right">退货申请</button>
								<button @tap="editStatus(1)" class="cu-btn bg-red sm">确认收货</button>
							</view>
							<view v-else-if="details.status === 3"><button @tap="toComment" class="cu-btn bg-red sm">去评价</button></view>
						</view>
					</view>
				</view>
			</view>
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
		this.loadData(option.id);
	},
	methods: {
		loadData(id) {
			this.$minApi
				.orderDetails({ id: id })
				.then(res => {
					this.details = res.data;
				})
				.catch(err => {
					console.log(err);
				});
		},
		doPay() {
			this.$minApi
				.orderPay({
					order_id: this.details.id,
				})
				.then(res => {
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
		editStatus(status) {
			this.$minApi
				.orderEdit({ id: this.details.id, status: status })
				.then(res => {
					this.details = res.data;
				})
				.catch(err => {
					console.log(err);
				});
		},
		toComment() {
			uni.navigateTo({
				url: '/pages/order/comment?order_id' + this.details.id
			});
		},
		toGoodsDetails(id) {
			uni.navigateTo({
				url: '/pages/goods/details?id=' + id + '&keyword=' + this.globalData.userInfo.keyword
			});
		}
	}
};
</script>

<style></style>
