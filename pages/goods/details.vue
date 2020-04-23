<template>
	<view class="bg-white" style="margin-bottom: 100upx;">
		<view class="bg-img padding-bottom-xl" :style="'background-image: url(' + globalData.file_url + details.img + ');height: 355upx;'">
			<view class="padding-top text-right" style="position: absolute;right: 0;">
				<button open-type="contact" class="share-but bg-red padding-lr-sm flex align-center text-sm">
					分享
					<text class="cuIcon-share margin-left-xs"></text>
				</button>
			</view>
		</view>
		<view class="bg-img padding-bottom-xl" style="background-image: url('../../static/img/prize-bg-1.png');height: 100upx;">
			<view class="flex align-center justify-between text-white padding-lr" style="height: 100upx;">
				<view class="flex align-center">
					<text class="text-xxl text-price">{{ details.price }}</text>
					<text class="text-price padding-lr-xs text-sm">{{ (details.price / details.discount).toFixed(2) }}</text>
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
		<view class="padding text-bold text-lg">{{ details.title }}</view>
		<view class="margin-bottom padding-lr">
			<view v-for="(item, index) in details.tags" :key="index" class="cu-tag line-red sm round">{{ item }}</view>
		</view>
		<view class="flex justify-center align-center margin-top-xl">
			<view class="bg-gray basis-xs" style="height: 3upx;"></view>
			<view class="text-gray padding-lr-sm">奖励金流程</view>
			<view class="bg-gray basis-xs" style="height: 3upx;"></view>
		</view>
		<view class="cu-steps text-sm margin-top-sm margin-bottom">
			<view class="cu-item">
				<text class="cuIcon-appreciate text-red"></text>
				分享商品链接
			</view>
			<view class="cu-item">
				<text class="cuIcon-appreciate text-red"></text>
				<view>
					<view>好友通过分享</view>
					<view>链接购买</view>
				</view>
			</view>
			<view class="cu-item">
				<text class="cuIcon-appreciate text-red"></text>
				好友确定收货
			</view>
			<view class="cu-item">
				<text class="cuIcon-appreciate text-red"></text>
				<view>奖励金到账</view>
				<view>账户余额</view>
			</view>
		</view>

		<view class="flex justify-center align-center margin-tb-xl">
			<view class="bg-gray basis-xs" style="height: 3upx;"></view>
			<view class="text-gray padding-lr-sm">商品详情</view>
			<view class="bg-gray basis-xs" style="height: 3upx;"></view>
		</view>
		<view class="goods_details" v-html="details.details">
			<!-- <image mode="widthFix" class="response" v-for="(item, index) in details.details" :key="index" :src="globalData.file_url + item"></image> -->
		</view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<button open-type="contact" class="action">
				<view class="cuIcon-service"></view>
				客服
			</button>
			<navigator hover-class="none" url="/pages/goods/cart" class="action">
				<view class="cuIcon-cart">
					<view v-if="globalData.cart_count != 0" class="cu-tag badge">{{ globalData.cart_count > 99 ? '99+' : globalData.cart_count }}</view>
				</view>
				购物车
			</navigator>
			<view @tap="addCart(details)" class="bg-red submit">加入购物车</view>
			<view @tap="toPay(details.id)" class="bg-black submit">立即购买</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			globalData: {},
			details: {},
		};
	},
	onLoad: function(option) {
		this.globalData = getApp().globalData;
		this.loadData(option.id);
		if (option.keyword && option.keyword != this.globalData.userInfo.keyword) {
			this.userBind(option.keyword);
		}
	},
	methods: {
		loadData(id) {
			this.$minApi.goodsDetails({ id: id }).then(res => {
				this.details = res.data;
			});
		},
		userBind(keyword) {
			this.$minApi.userBind({ keyword: keyword });
		},
		toPay(id) {
			uni.navigateTo({
				url: '/pages/order/ready?goods=' + id
			});
		},
		addCart(val) {
			this.$minApi
				.cartAdd({ goods_id: val.id })
				.then(res => {
					let that = this;
					uni.showModal({
						title: '提示',
						content: '已加入购物车，是否立即查看？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/goods/cart'
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					this.globalData.cart_count = this.globalData.cart_count + 1;
					getApp().globalData.cart_count = this.globalData.cart_count;
				})
				.catch(err => {
					console.log(err);
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
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}
.goods_details{
	min-height: 500upx;
}
..goods_details img{
	max-width: 100%;
}
</style>
