<template>
	<view>
		<view class="cu-card">
			<view class="cu-item shadow text-white" style="background-image:url(../../static/img/user-bg.png)">
				<view v-if="userInfo.id" class="margin-bottom-xl flex align-center margin-top-xl">
					<view class="cu-avatar xl round margin-lr" :style="'background-image:url('+userInfo.avatarurl+');'"></view>
					<view>
						<view class="margin-tb-xs text-Abc text-lg">{{userInfo.nickname}}</view>
						<view>{{userInfo.is_super ? '悦家帮主':'悦家会员'}}</view>
					</view>
				</view>
				<view v-else class="margin-bottom-xl flex align-center margin-top-xl">
					<view class="cu-avatar xl round margin-lr cuIcon-people"></view>
					<navigator hover-class="none" url="/pages/login" class="cu-btn margin-tb-sm round text-black">
						授权登录
					</navigator>
				</view>
				<view class="flex justify-between padding-lr-xl margin-tb text-sm">
					<navigator class="flex align-center" hover-class="none" url="/pages/user/address/index">
						<view class="cuIcon-location margin-right-xs"></view>
						<text>地址管理</text>
					</navigator>
					<navigator hover-class="none" url="/pages/user/wallet" class="flex align-center">
						<view class="cuIcon-moneybag margin-right-xs"></view>
						<text>我的钱包</text>
					</navigator>
				</view>
			</view>
		</view>
		<view class="cu-list menu card-menu margin-top">
			<navigator hover-class="none" url="/pages/user/bindphone" class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-mobile text-grey"></text>
					<text class="text-grey">绑定手机，享受更多权益!</text>
				</view>
			</navigator>
		</view>
		<navigator hover-class="none" url="/pages/user/senior" class="cu-list menu card-menu margin-top">
			<view class="cu-item arrow">
				<view class="content">申请帮主</view>
			</view>
		</navigator>
		<view class="cu-card">
			<view class="cu-item shadow">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">我的订单</view>
					<view class="action text-gray">
						<navigator hover-class="none" url="/pages/order/index?status=-1">查看更多</navigator>
					</view>
				</view>
				<view class="cu-list grid col-4 no-border">
					<view class="cu-item  ">
						<navigator hover-class="none" url="/pages/order/index?status=0">
							<view class="cuIcon-pay">
								<view class="cu-tag badge" v-if="order_count.status_0 > 0">
									<block>{{ order_count.status_0 > 99 ? '99+' : order_count.status_0 }}</block>
								</view>
							</view>
							<text>代付款</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator hover-class="none" url="/pages/order/index?status=1">
							<view class="cuIcon-send">
								<view class="cu-tag badge" v-if="order_count.status_1 > 0">
									<block>{{ order_count.status_1 > 99 ? '99+' : order_count.status_1 }}</block>
								</view>
							</view>
							<text>代发货</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator hover-class="none" url="/pages/order/index?status=2">
							<view class="cuIcon-deliver">
								<view class="cu-tag badge" v-if="order_count.status_2 > 0">
									<block>{{ order_count.status_2 > 99 ? '99+' : order_count.status_2 }}</block>
								</view>
							</view>
							<text>待收货</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator hover-class="none" url="/pages/order/index?status=3">
							<view class="cuIcon-comment">
								<view class="cu-tag badge" v-if="order_count.status_3 > 0">
									<block>{{ order_count.status_3 > 99 ? '99+' : order_count.status_3 }}</block>
								</view>
							</view>
							<text>待评价</text>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-card margin-bottom">
			<view class="cu-item shadow">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">常用工具</view>
				</view>
				<view class="cu-list  grid col-4 no-border">
					<view class="cu-item">
						<navigator hover-class="none" url="/pages/goods/cart">
							<view class="cuIcon-cart">
								<view class="cu-tag badge" v-if="cart_count > 0">
									<block>{{ cart_count > 99 ? '99+' : cart_count }}</block>
								</view>
							</view>
							<text>购物车</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator hover-class="none" url="/pages/user/discover">
							<view class="cuIcon-discover"></view>
							<text>会员寻品</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator hover-class="none" url="/pages/user/present">
							<view class="cuIcon-present"></view>
							<text>好礼专享</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator hover-class="none" url="/pages/user/invite">
							<view class="cuIcon-group"></view>
							<text>邀请好友</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator hover-class="none" url="/pages/user/choiceness">
							<view class="cuIcon-choiceness"></view>
							<text>会员权益</text>
						</navigator>
					</view>
					<button open-type="contact" class="cu-item" style="background-color: #ffffff;width:25%;margin-left: inherit;margin-right: inherit;line-height: inherit;">
						<view class="cuIcon-service"></view>
						<text>售后服务</text>
					</button>
					<button open-type="feedback" class="cu-item" style="background-color: #ffffff;width:25%;margin-left: inherit;margin-right: inherit;line-height: inherit;">
						<view class="cuIcon-service"></view>
						<text>意见反馈</text>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				globalData:{},
				userInfo: {},
				order_count: 0,
				cart_count: 0,
			};
		},
		onLoad: function(option) {
			this.globalData = getApp().globalData;
			this.userInfo = uni.getStorageSync('userInfo');
			this.loadData();
			if (option.order) {
				this.isOrder = true;
			}
		},
		methods: {
			loadData() {
				this.$minApi
					.orderCount({})
					.then(res => {
						this.order_count = res;
					})
					.catch(err => {
						console.log(err);
					});
				this.$minApi
					.cartCount({})
					.then(res => {
						this.cart_count = res;
					})
					.catch(err => {
						console.log(err);
					});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},
			Gridchange(e) {
				this.gridCol = e.detail.value;
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value;
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value;
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value;
			},
			MenuCard(e) {
				this.menuCard = e.detail.value;
			},
			SwitchSex(e) {
				this.skin = e.detail.value;
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
					this.modalName = e.currentTarget.dataset.target;
				} else {
					this.modalName = null;
				}
				this.listTouchDirection = null;
			}
		}
	};
</script>

<style></style>
