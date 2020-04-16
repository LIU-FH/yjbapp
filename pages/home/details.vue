<template>
	<view class="bg-white">
		<view class="bg-img padding-bottom-xl" :style="'background-image: url('+details.img+');height: 355upx;'">
			<view class="padding-top text-right" style="position: absolute;right: 0;">
				<view class="share-but bg-red padding-lr-sm flex align-center text-sm">
					分享
					<text class="cuIcon-share margin-left-xs"></text>
				</view>
			</view>
		</view>
		<view class="bg-img padding-bottom-xl" style="background-image: url('../../static/img/prize-bg-1.png');height: 100upx;">
			<view class="flex align-center justify-between text-white padding-lr" style="height: 100upx;">
				<view class="flex align-center">
					<text class="text-xxl text-price">{{details.price}}</text>
					<text class="text-price padding-lr-xs text-sm">{{(details.price/details.discount).toFixed(2)}}</text>
				</view>
				<view>
					<view class="text-center text-red">
						<text class="cuIcon-hotfill"></text>
						<text class="cuIcon-hotfill"></text>
						<text class="cuIcon-hotfill"></text>
					</view>
					<view class="text-red text-sm text-bold">已售出{{ details.buy_count }}份</view>
				</view>
			</view>
		</view>
		<view class="padding text-bold text-lg">{{details.title}}</view>

		<view class="flex justify-center align-center margin-top">
			<view class="bg-gray basis-xs" style="height: 5upx;"></view>
			<view class="text-bold padding-lr-sm">奖励金流程</view>
			<view class="bg-gray basis-xs" style="height: 5upx;"></view>
		</view>
		<view class="cu-steps text-sm margin-top-sm margin-bottom">
			<view class="cu-item">
				<text class="cuIcon-appreciate"></text>
				分享商品链接
			</view>
			<view class="cu-item">
				<text class="cuIcon-appreciate"></text>
				<view>
					<view>好友通过分享</view>
					<view>链接购买</view>
				</view>
			</view>
			<view class="cu-item">
				<text class="cuIcon-appreciate"></text>
				好友确定收货
			</view>
			<view class="cu-item">
				<text class="cuIcon-appreciate"></text>
				<view>奖励金到账</view>
				<view>账户余额</view>
			</view>
		</view>

		<view class="flex justify-center align-center margin-top">
			<view class="bg-gray basis-xs" style="height: 5upx;"></view>
			<view class="text-bold padding-lr-sm">商品详情</view>
			<view class="bg-gray basis-xs" style="height: 5upx;"></view>
		</view>
		<view style="min-height: 500upx;">
			<image v-for="(item,index) in details.details" :key="index" :src="item"></image>
		</view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<navigator hover-class="none" url="/pages/home/index" class="action">
				<view class="cuIcon-home"></view>
				首页
			</navigator>
			<navigator hover-class="none" url="/pages/goods/cart" class="action">
				<view class="cuIcon-cart"><view class="cu-tag badge">99</view></view>
				购物车
			</navigator>
			<view class="bg-red submit">加入购物车</view>
			<view @tap="doPay()" class="bg-black submit">立即购买</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			details: {}
		};
	},
	onLoad: function(option) {
		this.loadData(option.id);
	},
	methods: {
		loadData(id) {
			this.$minApi
				.goodsDetails({ id: id })
				.then(res => {
					this.details = res.data;
				})
				.catch(err => {
					console.log(err);
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
.share-but {
	height: 60upx;
	border-top-left-radius: 30upx;
	border-bottom-left-radius: 30upx;
}
</style>
