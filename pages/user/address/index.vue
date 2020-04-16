<template>
	<view style="margin-bottom: 200upx;">
		<view class="cu-list menu sm-border margin-tb">
			<view class="cu-item" v-for="(item, index) in list.data" :key="index">
				<view @tap="clickItem(item)" class="content padding-tb-sm">
					<view class="flex align-center justify-between">
						<view class="flex">
							<view v-if="item.default" class="cu-tag bg-orange sm margin-right-xs">默认</view>
							<view class="text-cut">{{ item.name }}</view>
						</view>
						<view class="flex">
							<view @tap="toEdit(item)" class="action margin-right-sm"><text class="lg cuIcon-edit"></text></view>
							<view @tap="del(item.id)" class="action"><text class="lg cuIcon-delete"></text></view>
						</view>
					</view>
					<view class="text-gray text-sm">
						<text class="margin-right">{{ item.tel }}</text>
						<text>{{ item.city + ',' + item.details }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar foot shadow-none padding-bottom-xl padding-lr"><view @tap="toEdit()" class="cu-btn bg-red shadow-blur round lg response">新增</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: {},
			isOrder: false
		};
	},
	onLoad: function(option) {
		this.loadData();
		if (option.order) {
			this.isOrder = true;
		}
	},
	onShow() {
		if (uni.getStorageSync('address-load')) {
			this.loadData();
			uni.removeStorageSync('address-load');
		}
	},
	methods: {
		loadData() {
			this.$minApi
				.address({})
				.then(res => {
					this.list = res;
				})
				.catch(err => {
					console.log(err);
				});
		},
		toEdit(val) {
			uni.setStorageSync('address-edit', val);
			uni.navigateTo({
				url: '/pages/user/address/edit'
			});
		},
		del(id) {
			this.$minApi
				.addressDel({ id: id })
				.then(res => {
					this.loadData();
				})
				.catch(err => {
					console.log(err);
				});
		},
		clickItem(item) {
			if (this.isOrder) {
				uni.setStorageSync('address-select', item);
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
};
</script>

<style></style>
