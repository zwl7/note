<template>
	<view class="container">
		<view class="bar" :style="{ width: percent + '%' }"></view>
	</view>
</template>
<script>
export default {
	props: {
		percent: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {};
	}
};
</script>
<style lang="scss" scoped>
.container {
	display: block;
	width: 100%;
	height: 100%;
	background-color: #f2f3f5;
	.bar {
		height: 100%;
		width: 0%;
		background-color: $pp-color-primary;
	}
}
</style>
