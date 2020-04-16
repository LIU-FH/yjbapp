<template>
	<view class="bg-white">
		<view class="bg-img padding-bottom-xl" style="background-image: url('../../static/img/goods-1.png');height: 355upx;">
		</view>
		<view class="bg-img padding-bottom-xl" style="background-image: url('../../static/img/prize-bg-1.png');height: 100upx;">
			<view class="flex align-center justify-between text-white padding-lr" style="height: 100upx;">
				<view class="flex align-center">
					<text class="text-xxl text-price">99.00 </text>
					<text class="text-price padding-lr-xs text-sm">80.00</text>
				 </view>
				<view>
					<view class="text-center text-red">
						<text class="cuIcon-hotfill"></text>
						<text class="cuIcon-hotfill"></text>
						<text class="cuIcon-hotfill"></text>
					</view>
					<view class="text-red text-sm text-bold">已售出123份</view>
				</view>
			</view>
		</view>
		<view class="padding text-bold text-lg">【10点爆款】【XXX】无公害土鸡蛋30个/份（精品，有无公害印字）</view>
		<view class="padding-lr">
			<view class='cu-tag radius light line-red'>新鲜</view>
			<view class='cu-tag radius light line-red'>热卖</view>
			<view class='cu-tag radius light line-red'>下期预告</view>
		</view>
		<view class="margin-tb margin-lr flex padding-tb align-center justify-between" style="background-color: #F4E9E3;">
			<view class="basis-lg">
				<view class="text-sm margin-left margin-bottom-xs">有<text class="text-red">1231223</text>人购买，剩余<text class="text-red">123</text>份</view>
				<view class="cu-avatar-group margin-left-xs">
					<view class="cu-avatar round" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
				</view>
			</view>
			<view class="padding-right">
				<button @tap="showModal" class="cu-btn bg-red shadow-blur round">邀请好友一起抢</button>
				<view class="cu-modal" :class="showShare ? 'show':''">
					<view class="cu-dialog" style="width: 500upx;background-color: rgba(0,0,0,0);">
						<view class="bg-img" style="background-image: url('../../static/img/share-bg.png');height:700upx;">
							<view class="cu-bar justify-end text-white">
								<view class="action" @tap="hideModal">
									<text class="cuIcon-close "></text>
								</view>
							</view>
						</view>
						<button class="cu-btn bg-red shadow-blur round lg margin-top">点击图片长按保存</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="flex justify-center align-center margin-top">
			<view class="bg-gray basis-xs" style="height: 5upx;"></view>
			<view class="text-bold padding-lr-sm">商品详情</view>
			<view class="bg-gray basis-xs" style="height: 5upx;"></view>
		</view>
		<view></view>
		
		
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
