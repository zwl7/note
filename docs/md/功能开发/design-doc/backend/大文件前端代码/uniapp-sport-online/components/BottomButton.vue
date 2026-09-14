<template>
	<view :class="['bottom-button', { isIos: isIos }]">
		<view class="header"></view>
		<view class="mian">
			<slot></slot>
			<button :class="['main-button', { disabled: disabled }]" v-if="showButton" @click="handleClick">{{ title }}</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'BottomButton',
	props: {
		showButton: {
			type: Boolean,
			default: true
		},
		title: {
			type: String,
			default: '确定'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isIos: getApp().globalData.isIos
		};
	},
	methods: {
		handleClick() {
			this.$emit('submit');
		}
	}
};
</script>

<style lang="scss" scoped>
.bottom-button {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	background-color: #fff;
	padding: 10rpx 32rpx;
	border-top: 2rpx solid #f1f2f5;
}

.main {
	display: flex;
}
.main-button {
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	height: 80rpx;
	border-radius: 80rpx;
	background-color: $pp-color-primary;
	font-size: 28rpx;
	color: #fff;
}
.disabled {
	background-color: #f8a19e;
}
</style>
