<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			url: ''
		};
	},
	onLoad(options) {
		let url = decodeURIComponent(options.url);
		console.log(url);
		this.url = url;
	},
	methods: {}
};
</script>

<style></style>
