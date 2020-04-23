<template>
	<view style="margin-bottom: 100upx;">
		<view>
			<view class="cu-list bg-white">
				<view
					class="cu-item flex"
					:class="moveCurId == item.id ? 'move-cur' : ''"
					v-for="(item, index) in list"
					:key="index"
					@touchstart="ListTouchStart"
					@touchmove="ListTouchMove"
					@touchend="ListTouchEnd"
					:data-target="item.id"
				>
					<view class="flex align-center padding width-full">
						<checkbox-group @change="CheckboxChange(item.id)">
							<checkbox
								class="round"
								:class="checkedList.indexOf(item.id) > -1 ? 'checked' : ''"
								:checked="checkedList.indexOf(item.id) > -1 ? true : false"
							></checkbox>
						</checkbox-group>
						<view
							@tap="toGoodsDetails(item.goods.id)"
							class="cu-avatar xl margin-lr-sm flex-none"
							:style="'background-image:url(' + globalData.file_url + item.goods.img + ');'"
						></view>
						<view class="width-full">
							<view @tap="toGoodsDetails(item.goods.id)" style="height: 60upx;" class="text-cut">{{ item.goods.title }}</view>
							<view class="flex align-center justify-between">
								<view @tap="toGoodsDetails(item.goods.id)" class=" text-price text-red text-lg">{{ item.goods.price }}</view>
								<view class="bg-red flex border">
									<view @tap="editNum(index, item.num + 1)" class="cuIcon-add padding-xs"></view>
									<view class="padding-tb-xs padding-lr-sm bg-white">{{ item.num }}</view>
									<view @tap="editNum(index, item.num - 1)" class="cuIcon-move padding-xs"></view>
								</view>
							</view>
						</view>
					</view>
					<view class="move"><view class="text-red" @tap="del(1, index)">删除</view></view>
				</view>
				<view v-if="failureList.length > 0">
					<view class="flex justify-center align-center margin-tb">
						<view class="bg-gray basis-xs" style="height: 3upx;"></view>
						<view class="text-gray padding-lr-sm">失效商品</view>
						<view class="bg-gray basis-xs" style="height: 3upx;"></view>
					</view>
					<view class="cu-list">
						<view
							class="cu-item flex"
							:class="moveCurId == item.id ? 'move-cur' : ''"
							v-for="(item, index) in failureList"
							:key="index"
							@touchstart="ListTouchStart"
							@touchmove="ListTouchMove"
							@touchend="ListTouchEnd"
							:data-target="item.id"
						>
							<view class="flex align-center padding width-full">
								<checkbox-group class="block" @change="DelCheckboxChange(index)"><checkbox class="round"></checkbox></checkbox-group>
								<view
									@tap="toGoodsDetails(item.goods.id)"
									class="cu-avatar xl margin-lr-sm flex-none"
									:style="'background-image:url(' + globalData.file_url + item.goods.img + ');'"
								>
									<image style="width: 70upx;height: 70upx;" src="../../static/img/goods-empty.png"></image>
								</view>
								<view @tap="toGoodsDetails(item.goods.id)" class="width-full">
									<view style="height: 80upx;" class="text-cut">{{ item.goods.title }}</view>
									<view class="text-gray text-sm">抱歉，该宝贝已失效，请重新选择</view>
								</view>
							</view>
							<view class="move"><view class="text-red" @tap="del(0, index)">删除</view></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<view class="basis-lg flex align-center padding-lr-sm justify-between">
				<checkbox-group class="block" @change="AllCheckboxChange">
					<checkbox class="round" :class="isAll ? 'checked' : ''" :checked="isAll ? true : false"><text class="padding-lr-sm">全选</text></checkbox>
				</checkbox-group>
				<view class="text-xxl text-price text-red">{{ total_amount }}</view>
			</view>
			<view @tap="toPay" class="bg-red submit">结算</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			globalData: {},
			list: [],
			failureList: [],
			checkedList: [],
			isAll: false,
			total_amount: 0,
			moveCurId: null,
			listTouchStart: 0,
			listTouchDirection: null
		};
	},
	onLoad() {
		this.globalData = getApp().globalData;
		this.loadData();
	},
	methods: {
		loadData() {
			this.$minApi
				.cart()
				.then(res => {
					for (let i = 0; i < res.data.length; i++) {
						if (res.data[i].goods.sell_status.status === 0) {
							this.list.push(res.data[i]);
						} else {
							this.failureList.push(res.data[i]);
						}
					}
					getApp().globalData.cart_count = this.list.length
				})
				.catch(err => {
					console.log(err);
				});
		},
		CheckboxChange(id) {
			let index = this.checkedList.indexOf(id);
			if (index > -1) {
				this.checkedList.splice(index, 1, 0);
			} else {
				this.checkedList.push(id);
			}
			this.countAmount();
		},
		AllCheckboxChange() {
			this.isAll = !this.isAll;
			this.checkedList = [];
			if (this.isAll) {
				for (let i = 0; i < this.list.length; i++) {
					this.checkedList.push(this.list[i].id);
				}
			}
			this.countAmount();
		},
		DelCheckboxChange(index) {
			let that = this;
			uni.showModal({
				title: '提示',
				content: '商品已失效，是否删除？',
				success: function(res) {
					if (res.confirm) {
						that.del(0, index);
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		countAmount() {
			console.log(this.checkedList);
			let total_amount = 0;
			for (let i = 0; i < this.list.length; i++) {
				if (this.checkedList.indexOf(this.list[i].id) > -1) {
					total_amount += this.list[i].goods.price * this.list[i].num;
				}
			}
			this.total_amount = total_amount.toFixed(2);
		},
		editNum(index, num) {
			this.$minApi
				.cartEdit({ id: this.list[index].id, num: num })
				.then(res => {
					this.list[index].num = num;
				})
				.catch(err => {
					console.log(err);
				});
		},
		del(type, index) {
			this.$minApi
				.cartDel({ id: type ? this.list[index].id : this.failureList[index].id })
				.then(res => {
					if (type) {
						this.list.splice(index, 1);
					} else {
						this.failureList.splice(index, 1);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		toGoodsDetails(id) {
			uni.navigateTo({
				url: '/pages/goods/details?id=' + id
			});
		},
		toPay() {
			let cart = this.checkedList.join(',')
			if(!cart){
				uni.showToast({
					icon: 'none',
					title: "请选择要购买的商品",
					duration: 2000
				});
				return false;
			}
			uni.navigateTo({
				url: '/pages/order/ready?cart=' + cart
			});
		},
		// ListTouch触摸开始
		ListTouchStart(e) {
			this.listTouchStart = e.touches[0].pageX;
		},

		// ListTouch计算方向
		ListTouchMove(e) {
			this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left';
		},

		// ListTouch计算滚动
		ListTouchEnd(e) {
			if (this.listTouchDirection == 'left') {
				this.moveCurId = e.currentTarget.dataset.target;
			} else {
				this.moveCurId = null;
			}
			this.listTouchDirection = null;
		}
	}
};
</script>
<style></style>
