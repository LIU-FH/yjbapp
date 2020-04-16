<template>
	<view>
	<view class="bg-img padding-bottom-xl" style="background-image: url('../../static/img/present.png');height: 285upx;">
	</view>
			<view class="padding-lr margin-top text-bold">
				精选好礼
			</view>
		
		<view class="cu-card article">
			<view v-for="(item,index) in list.data" :key="index" class="cu-item shadow">
				<view class="content margin-top">
					<image @tap="toGoodsDetails(item.id)" style="height: 7em;" :src="globalData.file_url + item.img"
					 mode="aspectFill"></image>
					<view class="desc" style="width: 60%;">
						<view @tap="toGoodsDetails(item.id)" class="flex-sub">
							<view class="text-cut" style="font-weight: 500;">{{item.title}}</view>
							<view class="flex align-center margin-tb-sm text-sm">
								<view v-if="index%2 === 1" class="bg-shadeBottom padding-xxs margin-right-xs">帮主专享</view>
								<view v-else class="bg-gray padding-xxs margin-right-xs">普悦专享</view>
								<view>{{item.tags[0]}}</view>
							</view>
						</view>
						<view>
							<button @tap="toPay(item.id)" class="cu-btn round lines-red">立即购买</button>
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
				list: {}
			};
		},
		onLoad() {
			this.globalData = getApp().globalData;
			this.loadData();
		},
		methods: {
			loadData() {
				this.$minApi
					.goods({category_id: 4})
					.then(res => {
						this.list = res;
					})
					.catch(err => {
						console.log(err);
					});
			},
			toGoodsDetails(id) {
				uni.navigateTo({
					url: '/pages/goods/details?id=' + id + '&keyword=' + this.globalData.userInfo.keyword
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
</style>
