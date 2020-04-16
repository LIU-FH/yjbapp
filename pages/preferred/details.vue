<template>
	<view class="bg-white">
		<view class="bg-img padding-bottom-xl" style="background-image: url('../../static/img/goods-1.png');height: 355upx;">
		</view>
		<view class="bg-img padding-bottom-xl" style="background-image: url('../../static/img/prize-bg.png');height: 100upx;">
			<view class="flex align-center justify-between text-white padding-lr" style="height: 100upx;">
				<view class="flex align-center">
					<text class="margin-right-xs">团购价</text>
					<text class="text-xxl text-price">99.00 </text>
					<text class="text-price padding-lr-xs text-sm">80.00</text>
				 </view>
				<view class="text-sm">
					<view class="margin-bottom-xs">即将结束</view>
					<view>07:32:32</view>
				</view>
			</view>
		</view>
		<view class="padding text-bold text-lg">【10点爆款】【XXX】无公害土鸡蛋30个/份（精品，有无公害印字）</view>
		<view class="flex align-center justify-between">
			<view class="text-sm flex align-center padding-left">
				<view class="radius bg-red margin-right-xs" style="width: 33upx;height: 33upx;"></view>
				<text class="text-red">已售10000</text>
				<text class="text-gray margin-lr-xs">/</text>
				<text class="text-gray">剩余1000</text>
				</view>
			<view class="share-but bg-black padding-lr-sm flex align-center text-sm">分享<text class="cuIcon-share margin-left-xs"></text></view>
		</view>
		
		<view class="cu-steps text-sm margin-top-sm margin-bottom">
			<view class="cu-item">
				<text class="cuIcon-appreciate"></text><view>开始</view><view>04-20 10:00</view>
			</view>
			<view class="cu-item">
				<text class="cuIcon-appreciate"></text><view>结束</view><view>04-20 19:00</view>
			</view>
			<view class="cu-item">
				<text class="cuIcon-appreciate"></text><view>发货</view><view>04-21 10:00</view>
			</view>
		</view>
		
		<view class="padding">
			<view class="text-gray">还有这些朋友也订购了此商品</view>
			<view class="margin-top">
				<view v-for="(item,index) in 8" :key="index" class="cu-avatar round margin-right-xs" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
			</view>
			<view class="flex justify-center align-center margin-top text-gray">
				<view class="bg-gray basis-xs" style="height: 5upx;"></view>
				<view class="txt-sm padding-lr-xs">这些东西经常和下面的一起被买</view>
				<view class="bg-gray basis-xs" style="height: 5upx;"></view>
			</view>
			<view class="margin-tb">
				<scroll-view  scroll-x="true" @scroll="scroll" scroll-left="120">
					<view class="flex">
				   <view v-for="(item,index) in 5" :key="index" class="margin-right-sm" style="height: 300upx;width: 300upx;">
					<view class="bg-img padding-bottom-xl" style="background-image: url('../../static/img/goods-1.png');height: 220upx;">
					 <view style="position: absolute;" class="bg-red padding-lr-xs">
						<text class="text-sm text-price">99.00 </text>
					 </view>
					</view>
					<view class="bg-red padding-lr-sm padding-tb-xs text-center text-cut text-sm">无公害土鸡蛋30个/份</view>
				   </view></view>
				</scroll-view>
				
			</view>
		</view>
		<view style="min-height: 500upx;"></view>
		
		
		<view class="cu-bar bg-white tabbar border shop foot">
			<navigator hover-class='none' url="/pages/home/index" class="action">
				<view class="cuIcon-home">
				</view>
				首页
			</navigator>
			<navigator hover-class='none' url="/pages/goods/cart" class="action">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				购物车
			</navigator>
			<view class="bg-red submit" @tap="showSkuModal">加入购物车</view>
			<view class="bg-black submit" @tap="showSkuModal">立即购买</view>
			
			
		</view>
		<view class="cu-modal bottom-modal" :class="showSku ?'show':''">
			<view class="cu-dialog bg-white text-left">
				<view @tap="hideSkuModal" class="lg text-gray cuIcon-roundclose text-sl" style="position: absolute;top:20upx;right:30upx;z-index: 1;"></view>
				<view class="cu-list menu-avatar margin-top">
					<view class="cu-item">
						<view class="cu-avatar xl" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
						<view class="content" style="left: 180upx;">
							<view class="text-xxl text-price text-red" style="font-size: 40upx;">99.00 </view>
							<view class="text-grey text-left text-price text-sm">原价80.00</view>
							<view class="text-grey text-left text-price text-sm">已选：默认</view>
						</view>
					</view>
				</view>
				<view class="padding-lr margin-bottom">
					<view>
						<view class="margin-tb">默认</view>
						<view>
							<view class='cu-tag radius light line-red'>新鲜</view>
						</view>
					</view>
					<view class="margin-tb">
						购买数量
					</view>
					<view class="flex align-center justify-between">
						<view class="text-xxl text-price text-red">99.00 </view>
						<button @tap="hideSkuModal" class="cu-btn bg-red shadow-blur round lg">确定</button>
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
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
				],
				showShare:false,
				showSku:false
			}
		},
		methods: {
			showModal(e) {
				this.showShare = true
			},
			hideModal(e) {
				this.showShare = false
			},
			showSkuModal(e) {
				this.showSku = true
			},
			hideSkuModal(e) {
				this.showSku = false
			},
			scroll: function(e) {
			            console.log(e)
			            this.old.scrollTop = e.detail.scrollTop
			        },
		}
	}
</script>

<style>
	.share-but{
		height: 60upx;
		border-top-left-radius: 30upx;
		border-bottom-left-radius: 30upx;
	}
</style>
