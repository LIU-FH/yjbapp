<template>
	<view class="margin-bottom">
		<view class="cu-card case">
			<!-- <view class="text-center margin-top text-gray">由【XXX贸易】直供</view> -->
			<view v-for="(item, index) in list.data" :key="index" class="cu-item shadow">
				<view @tap="toGoodsDetails(item.id)" class="image">
					<image style="height: 380upx; width: 100%;" :src="globalData.file_url + item.img"></image>
					<view class="bg-red text-sm padding-lr-xs padding-tb-xxs" style="top: 0;left: 0;position: absolute;">关注：{{ item.click_count }}</view>
				</view>
				<view class="cu-list">
					<view class="cu-item padding-lr">
						<view @tap="toGoodsDetails(item.id)" style="font-weight: 500;">{{ item.title }}</view>
						<!-- <view class="margin-tb-xs text-red">预售：02-12 20:00 - 12:22</view> -->
						<view @tap="toGoodsDetails(item.id)" class="text-sm margin-tb-xs">
							<text class="text-gray">已售{{ item.buy_count }}</text>
							<text class="text-gray margin-lr-xs">/</text>
							<text class="text-gray">剩余{{ item.stock - item.buy_count }}</text>
						</view>
						<view class="flex align-center justify-between">
							<view @tap="toGoodsDetails(item.id)" class="flex align-center">
								<text class="text-xxl text-price text-red">{{ item.price }}</text>
								<text class="text-grey text-price padding-lr-xs text-sm">原价{{ (item.price / item.discount).toFixed(2) }}</text>
							</view>
							<view @tap="toPay(item.id)" class="text-gray"><button class="cu-btn round lines-red">立即购买</button></view>
						</view>
					</view>
				</view>
				<view @tap="toGoodsDetails(item.id)" class="padding-lr margin-top-sm solid-top padding-bottom-xs padding-top-sm flex align-center justify-between">
					<view v-if="item.sell_status === 0" class="text-red">售卖中：{{ item.start_time }} - {{ item.end_time }}</view>
					<view v-else-if="item.sell_status === 1" class="text-red">{{ item.sell_name }}</view>
					<view v-else-if="item.sell_status === 2" class="text-red">开售：{{ item.start_time }}</view>
					<view v-else-if="item.sell_status === 3" class="text-red">发货：{{ item.send_time }}</view>
					<view>
						<view class="cu-avatar-group">
							<view class="cu-avatar round" v-for="(item1, index1) in item.buy_user" :key="index1" :style="[{ backgroundImage: 'url(' + item1.avatarurl + ')' }]"></view>
						</view>
						<text class="text-grey text-sm">等购买了次产品</text>
					</view>
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
			avatar: [
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg'
			],
			list: {}
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
				.goods({ category_id: 3, buy_user: 3 })
				.then(res => {
					this.list = res;
				})
				.catch(err => {
					console.log(err);
				});
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
.discount {
	background-color: red;
	color: #ffffff;
}
</style>
