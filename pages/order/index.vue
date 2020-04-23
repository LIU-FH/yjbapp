<template>
	<view>
		<scroll-view scroll-x class=" nav">
			<view class="flex text-center">
				<view
					class="cu-item flex-sub"
					:class="item.status == TabCur ? 'text-orange cur' : ''"
					v-for="(item, index) in TabItems"
					:key="index"
					@tap="tabSelect"
					:data-status="item.status"
				>
					{{ item.name }}
				</view>
			</view>
		</scroll-view>
		<!-- <view class="cu-bar search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" placeholder="请输入订单号或手机号" confirm-type="search"></input>
			</view>
		</view> -->

		<view class="cu-card article no-card margin-top">
			<view v-for="(item, index) in list.data" :key="index" class="cu-item margin-bottom-z">
				<view @tap="toDetails(item.id)" class="flex align-center justify-between padding-lr margin-top">
					<text>订单编号：{{ item.order_no }}</text>
					<text class="text-red">{{ item.status_text }}</text>
				</view>
				<view @tap="toDetails(item.id)" class="cu-item cu-list">
					<view class="cu-item flex align-center padding" v-for="(item1, index1) in item.details" :key="index1">
						<view class="cu-avatar xl margin-right-sm flex-none" :style="'background-image:url(' + globalData.file_url + item1.img + ');'"></view>
						<view class="width-full">
							<view style="height: 90upx;" class="text-cut">{{ item1.title }}</view>
							<view class="flex align-center justify-between">
								<view class=" text-price text-red text-lg">{{ item1.price }}</view>
								<view class="text-gray">x {{ item1.count }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex align-center justify-between padding-lr margin-top">
					<text @tap="toDetails(item.id)">合计：{{ item.amount }}</text>
					<view v-if="item.status === 0">
						<button @tap="editStatus(-7)" class="cu-btn line-red sm margin-right">取消订单</button>
						<button @tap="doPay(item.id)" class="cu-btn bg-red sm">立即支付</button>
					</view>
					<view v-else-if="item.status === 1">
						<button @tap="editStatus(-1)" class="cu-btn line-red sm margin-right">退款申请</button>
						<button @tap="editStatus(1)" class="cu-btn bg-red sm">提醒发货</button>
					</view>
					<view v-else-if="item.status === 2">
						<button @tap="editStatus(-4)" class="cu-btn line-red sm margin-right">退货申请</button>
						<button @tap="editStatus(1)" class="cu-btn bg-red sm">确认收货</button>
					</view>
					<view v-else-if="item.status === 3"><button @tap="toComment(item.id)" class="cu-btn bg-red sm">去评价</button></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			TabCur: -1,
			scrollLeft: 0,
			TabItems: [{ status: -1, name: '全部' }, { status: 0, name: '待付款' }, { status: 1, name: '待发货' }, { status: 2, name: '待收货' }, { status: 3, name: '待评价' }],
			globalData: {},
			list: {},
			search: ''
		};
	},
	onLoad: function(option) {
		if (option.status > -1) {
			this.TabCur = option.status;
		}
		this.globalData = getApp().globalData;
		this.loadData();
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.status;
			this.scrollLeft = (e.currentTarget.dataset.status - 1) * 60;
			this.loadData();
		},
		loadData() {
			let params = {};
			if (this.TabCur > -1) {
				params.status = this.TabCur;
			}
			this.$minApi
				.order(params)
				.then(res => {
					this.list = res;
				})
				.catch(err => {
					console.log(err);
				});
		},
		doPay(id) {
			this.$minApi
				.orderPay({
					order_id: id,
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
		toDetails(id) {
			uni.navigateTo({
				url: '/pages/order/details?id=' + id
			});
		},
		toComment(id) {
			uni.navigateTo({
				url: '/pages/order/comment?order_id' + id
			});
		},
		editStatus(index, status) {
			this.$minApi
				.orderEdit({ id: this.list.data[index].id, status: status })
				.then(res => {
					this.list.data[index] = res.data;
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style>
.margin-bottom-z {
	margin-bottom: 15px !important;
}
</style>
