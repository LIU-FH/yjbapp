<template>
	<view>
		{{ercode}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ercode:''
			}
		},
		onLoad: function(option) {
			this.loadData();
		},
		methods: {
			loadData() {
				this.$minApi
					.erCode({})
					.then(res => {
						this.ercode = res;
					})
					.catch(err => {
						console.log(err);
					});
			},
		}
	}
</script>

<style>

</style>
