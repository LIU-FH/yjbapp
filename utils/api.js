import MinRequest from './MinRequest'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	uni.showLoading({
		title: '加载中'
	});
	return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
	uni.hideLoading();

	switch (response.statusCode) {
		case 200:
			return response.data
			break;
		case 500:
			uni.showToast({
				icon: 'none',
				title: response.data.message,
				duration: 2000
			});
			return {
				error: response.data
			};
			break;
	}
})

// 设置默认配置
minRequest.setConfig((config) => {
	config.baseURL = 'http://www.laravel.local/api/v1/'
	return config
})

export default {
	apis: {
		wxLogin(data) {
			return minRequest.post('auth/wx_login', data)
		},
		phoneLogin(data) {
			return minRequest.post('auth/phone_login', data)
		},
		goods(data) {
			return minRequest.get('goods/goods', data)
		},
		goodsDetails(data) {
			return minRequest.get('goods/goods/' + data.id)
		},
		cart() {
			return minRequest.get('goods/goods_cart')
		},
		cartAdd(data) {
			return minRequest.post('goods/goods_cart', data)
		},
		cartEdit(data) {
			return minRequest.patch('goods/goods_cart/' + data.id, data)
		},
		cartDel(data) {
			return minRequest.delete('goods/goods_cart/' + data.id)
		},

		orderReady(data) {
			return minRequest.post('order/ready', data)
		},
		orderPay(data) {
			return minRequest.post('order/order_pay', data)
		},
		orderAdd(data) {
			return minRequest.post('order/order', data)
		},
		order(data) {
			return minRequest.get('order/order', data)
		},
		orderDetails(data) {
			return minRequest.get('order/order/' + data.id)
		},
		orderEdit(data) {
			return minRequest.post('order/order/update', data)
		},

		address(data) {
			return minRequest.get('user/address', data)
		},
		addressAdd(data) {
			return minRequest.post('user/address', data)
		},
		addressEdit(data) {
			return minRequest.patch('user/address/' + data.id, data)
		},
		addressDel(data) {
			return minRequest.delete('user/address/' + data.id)
		},

		goodsSearchAdd(data) {
			return minRequest.post('goods/goods_search', data)
		},

		userInfo() {
			return minRequest.get('user/info')
		},
		orderCount() {
			return minRequest.get('user/order_count')
		},
		cartCount() {
			return minRequest.get('user/cart_count')
		},
		erCode() {
			return minRequest.get('user/ercode')
		},
		userBind($data) {
			return minRequest.post('user/bind_parent', $data)
		},
		phoneCode($data) {
			return minRequest.post('phone_code', $data)
		},
		phoneBind($data) {
			return minRequest.post('user/bind_phone', $data)
		},
		wallet() {
			return minRequest.get('user/wallet')
		},
		walletRecord() {
			return minRequest.get('user/wallet_record')
		},
		withdrawAdd(data) {
			return minRequest.post('user/withdraw', data)
		}
	}
}
