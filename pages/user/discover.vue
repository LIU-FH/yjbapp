<template>
	<view>
		<view class="margin-top">
		<form >
			<view class="cu-form-group">
				<view class="title">产品类型</view>
				<input placeholder="产品类型" @input="InputType" :value="formData.type" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">产品名称</view>
				<input placeholder="产品名称" @input="InputName" :value="formData.name" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">期望价格</view>
				<input placeholder="期望价格" @input="InputPrice" :value="formData.price" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">期望数量</view>
				<input placeholder="期望数量" @input="InputNum" :value="formData.num" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<textarea maxlength="200" @input="InputMore" :value="formData.more" placeholder="更多要求（选填）"></textarea>
			</view>
			<view class="cu-bar bg-white">
				<view class="action">
					添加图片（选填）
				</view>
				<view class="action">
					{{formData.imgs.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in formData.imgs" :key="index" @tap="ViewImage" :data-url="formData.imgs[index]">
					 <image :src="globalData.file_url+formData.imgs[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="formData.imgs.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-bar foot shadow-none padding-bottom-xl padding-lr-xl">
			<button @tap="OnSubmit" class="cu-btn bg-red shadow-blur round lg response">发布</button>
			</view>
		</form></view>
	</view>
</template>

<script>
export default {
		data() {
			return {
				globalData:{},
				formData:{
					type:"",
					name:"",
					price:"",
					num:"",
					more:'',
					imgs:[]
				},
				modalName: null,
				textareaAValue: '',
				textareaBValue: ''
			};
		},
		onLoad() {
			this.globalData = getApp().globalData
		},
		methods: {
			OnSubmit() {
				let formData = JSON.parse(JSON.stringify(this.formData))
				formData.imgs = formData.imgs.join(',')
				let errMsg = '';
				if(!formData.type){
					errMsg = "请输入产品类型"
				}else if(!formData.name){
					errMsg = "请输入产品名称"
				}else if(!formData.price){
					errMsg = "请输入期望价格"
				}else if(!formData.num){
					errMsg = "请输入期望数量"
				}
				if(errMsg){
					uni.showToast({
						icon: 'none',
						title: errMsg,
						duration: 2000
					});
					return false;
				}
				this.$minApi
					.goodsSearchAdd(formData)
					.then(res => {
						uni.showToast({
							title: "提交成功",
							duration: 2000
						});
						setTimeout(function(){
							uni.navigateBack({
							    delta: 1
							});
						},2000)
					})
					.catch(err => {
						console.log(err);
					});
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: this.globalData.api_url+'/upload',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {},
							success: (uploadFileRes) => {
								this.formData.imgs.push(uploadFileRes.data)
							}
						});
						
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.formData.imgs,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				this.formData.imgs.splice(e.currentTarget.dataset.index, 1)
			},
			InputType(e) {
				this.formData.type = e.detail.value
			},
			InputName(e) {
				this.formData.name = e.detail.value
			},
			InputPrice(e) {
				this.formData.price = e.detail.value
			},
			InputNum(e) {
				this.formData.num = e.detail.value
			},
			InputMore(e) {
				this.formData.more = e.detail.value
			},
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.shadow-none{
		box-shadow:none
	}
</style>
