<template>
	<view>
		<view class="cu-card">
			<view class="cu-item shadow padding-xl text-white" style="background-image:url(../../static/img/wallet-bg.png);">
				<view class="margin-tb-xs text-Abc text-xl">
					账户余额
					<text class="bg-orange text-sm margin-left-sm round padding-tb-xxs padding-lr-xs">帮主</text>
				</view>
				<view class="text-xxl margin-tb">{{details.balance}}</view>
				<navigator hover-class="none" url="/pages/user/withdraw"><button class="cu-btn  round">提现</button></navigator>
			</view>
		</view>
		<view class="margin-top">
			<view class="cu-list menu-avatar margin-top" v-for="(item, index) in list.data" :key="index">
				<view v-if="item.be_user" class="cu-item">
					<view class="cu-avatar round lg" :style="'background-image:url(' + item.be_user.avatarurl + ');'"></view>
					<view class="content">
						<view>{{ item.be_user.nickname }}</view>
						<view class="text-sm text-gray">{{ item.created_at }}</view>
					</view>
				</view>
				<view class="flex align-center justify-between bg-white padding">
					<view>{{ item.desc }}</view>
					<view :class="item.change === 1 ? 'text-green' : 'text-red'">{{ item.change === 1 ? '+' : '-' }}{{ item.amount }} 元</view>
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
			list: {},
			details:{}
		};
	},
	onLoad() {
		this.globalData = getApp().globalData;
		this.loadData();
	},
	methods: {
		loadData() {
			this.$minApi
				.wallet()
				.then(res => {
					this.details = res.data;
				})
				.catch(err => {
					console.log(err);
				});
			this.$minApi
				.walletRecord()
				.then(res => {
					this.list = res;
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style></style>
