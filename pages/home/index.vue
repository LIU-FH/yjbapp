<template>
	<view style="margin-bottom: 50upx;">
		<view class="cu-bar bg-white solid-bottom"><image class="top-img" src="../../static/img/home-1.png"></image></view>
		<view class="cu-card case">
			<view v-for="(item, index) in list.data" :key="index" class="cu-item shadow">
				<view @tap="toGoodsDetails(item.id)" class="image">
					<image style="height: 350upx; width: 100%;" :src="globalData.file_url + item.img"></image>
					<view v-if="item.tags.length > 0" class="home-goods-tag bg-red text-sm padding-lr-xs padding-tb-xxs">{{ item.tags[0] }}</view>
				</view>
				<view class="cu-list">
					<view class="cu-item padding-lr-sm">
						<view @tap="toGoodsDetails(item.id)" class="color-666 margin-top-xs">{{ item.title }}</view>
						<view class="flex align-center justify-between">
							<view @tap="toGoodsDetails(item.id)" class="flex align-center">
								<text class="text-xxl text-price text-red">{{ item.price }}</text>
								<text class="text-grey text-price padding-lr-xs text-sm">原价{{ (item.price / item.discount).toFixed(2) }}</text>
								<text class="text-xs bg-orange home-tag2 padding-lr-xs">{{ item.discount * 10 }}折</text>
							</view>
							<view @tap="toPay(item.id)" class="text-gray"><button class="cu-btn round bg-red margin-tb-sm">立即购买</button></view>
						</view>
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
				.goods({ category_id: 1 })
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
.top-img {
	width: 11rem;
	height: 1.5rem;
	margin: 0 auto;
}
.color-666 {
	color: #666666;
}
.home-goods-tag {
	left: 0;
	top: 0;
	position: absolute;
	border-radius: 5px 0 15px 0;
	font-weight: 500;
}
.home-tag2 {
	border-radius: 10px 0 10px 0;
}
</style>
