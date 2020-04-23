<template>
	<view style="margin-bottom: 50upx;">
		<view class="flex align-center justify-center margin-tb">
			<view @click="NavChange" data-cur="current" :class="PageCur === 'current' ? 'bg-red' : 'bg-grey'" class=" cu-btn border-ra-left">限量抢购</view>
			<view @click="NavChange" data-cur="future" :class="PageCur === 'future' ? 'bg-red' : 'bg-grey'" class="cu-btn border-ra-right">下期预告</view>
		</view>

		<view v-if="PageCur == 'current'">
			<view class="text-center text-sm">每日06:00更新，距离结束10:12:31</view>
			<view class="padding-lr margin-top-sm"><button class="cu-btn round lines-red">全部</button></view>
		</view>
		<view v-if="PageCur == 'future'">
			<view class="text-center text-sm">每日06:00更新，距离开始10:12:31</view>
			<view class="padding-lr margin-top-sm"><button class="cu-btn round lines-red">爆品</button></view>
		</view>
		<view class="cu-card article">
			<view v-for="(item, index) in list1.data" :key="index" class="cu-item shadow">
				<view class="content margin-top">
					<image @tap="toGoodsDetails(item.id)" style="height: 7em;" :src="globalData.file_url + item.img" mode="aspectFill"></image>
					<view class="desc flex flex-direction" style="width: 60%;">
						<view @tap="toGoodsDetails(item.id)" class="flex-sub">
							<view class="text-cut" style="font-weight: 500;">{{ item.title }}</view>
							<view class="margin-tb-xs">
								<view v-for="(item1, index1) in item.tags" class="cu-tag line-red sm round">{{ item1 }}</view>
							</view>
							<view class="text-sm">
								<text class="text-gray">已售{{ item.buy_count }}</text>
								<text class="text-gray margin-lr-xs">/</text>
								<text class="text-red">剩余{{ item.stock - item.buy_count }}</text>
							</view>
						</view>
						<view class="flex align-center justify-between">
							<view @tap="toGoodsDetails(item.id)" class="flex align-center">
								<text class="text-xxl text-price text-red">{{ item.price }}</text>
								<text class="text-grey text-price padding-lr-xs text-sm">原价{{ (item.price / item.discount).toFixed(2) }}</text>
							</view>
							<image @tap="toPay(item.id)"  style="width: 50upx;height: 50upx;" src="../../static/img/cart.png"></image>
						</view>
					</view>
				</view>
				<view @tap="toGoodsDetails(item.id)" v-if="PageCur == 'future'" class="padding-lr solid-top padding-top-sm margin-top-sm flex align-center">
					<view class="radius bg-gray margin-right-xs" style="width: 33upx;height: 33upx;"></view>
					<text class="text-gray">售卖：2:00 - 3::00</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {
			globalData: {},
			userInfo:{},
			PageCur: 'current',
			list: {},
			list1: {},
			list2: {}
		};
	},
	onLoad() {
		this.globalData = getApp().globalData;
		this.userInfo = uni.getStorageSync('userInfo');
		this.loadData();
	},
	methods: {
		loadData() {
			this.$minApi
				.goods({ category_id: 2, sell: 1 })
				.then(res => {
					this.list1 = res;
				})
				.catch(err => {
					console.log(err);
				});
			this.$minApi
				.goods({ category_id: 2, sell: 0 })
				.then(res => {
					this.list2 = res;
				})
				.catch(err => {
					console.log(err);
				});
		},
		NavChange: function(e) {
			this.PageCur = e.currentTarget.dataset.cur;
			this.initList();
		},
		initList() {
			if (this.PageCur == 'current') {
				this.list = this.list1;
			} else if (this.PageCur == 'future') {
				this.list = this.list2;
			}
		},
		toGoodsDetails(id) {
			uni.navigateTo({
				url: '/pages/goods/details?id=' + id + '&keyword=' + this.userInfo.keyword
			});
		},
		toPay(id) {
			uni.navigateTo({
				url: '/pages/order/ready?goods=' + id
			});
		}
	}
};
</script>

<style>
.border-ra-left {
	border-radius: 16px 0 0 16px;
}
.border-ra-right {
	border-radius: 0 16px 16px 0;
}
</style>
