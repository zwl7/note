<template>
	<view :class="['out-container', { 'is-title ': isTitle }]" @click="handleClick">
		<view :class="['cell-item-container', { 'boder ': border }]">
			<view class="label">{{ label }}</view>
			<view class="value">
				<block>{{ value }}</block>
			</view>
			<view class="right" v-if="link">
				<uni-icons type="forward" color="#969799" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CellItem',
	props: {
		label: String,
		value: String,
		link: Boolean,
		isTitle: Boolean,
		border: Boolean
	},
	data() {
		return {};
	},
	methods: {
		handleClick() {
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss" scoped>
.out-container {
	box-sizing: border-box;
	padding: 0 32rpx;
	background-color: #fff;
}

.cell-item-container {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 108rpx;

	.label {
		padding-right: 20rpx;
		flex-shrink: 0;
		font-size: 28rpx;
		font-weight: 400;
		color: $pp-text-color;
	}

	.value {
		flex: 1;
		text-align: right;
		font-size: 14px;
		font-weight: 400;
		color: #969799;
	}
	.right {
		flex-shrink: 0;
		font-size: 14px;
		font-weight: 400;
		color: #969799;
		padding-left: 10rpx;
	}
}
.boder {
	border-bottom: 1rpx solid #ebedf0;
}
.is-title {
	background-color: transparent;
	.label {
		font-size: 32rpx;
		font-weight: 600 !important;
	}
}
</style>
