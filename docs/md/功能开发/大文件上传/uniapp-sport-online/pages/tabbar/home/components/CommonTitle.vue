<template>
	<view class="common-title-container">
		<view class="title">{{ title }}</view>
		<uni-icons type="forward" size="16" v-if="showMore" @click="handleClick"></uni-icons>
	</view>
</template>
<script>
export default {
	props: {
		showMore: {
			type: Boolean,
			default: false
		},

		title: {
			type: String,
			default: ''
		}
	},
	data() {
		return {};
	},
	methods: {
		handleClick() {
			this.$emit('more');
		}
	}
};
</script>
<style lang="scss" scoped>
.common-title-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: $pp-text-color;
	margin-bottom: 24rpx;
}
.title {
	font-size: 32rpx;
	font-weight: 600;
}
</style>
