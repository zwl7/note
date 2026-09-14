<template>
	<view :class="['notice-list-container', index == 0 ? 'active' : '']" @click="handleClick">
		<image v-if="info.images_url" :src="info.images_url" class="img" mode="widthFix" />
		<view class="right">
			<view class="des ellipsis-2">{{ info.name }}</view>
			<view class="c-time">{{ info.c_time }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'NoticeList',
	props: {
		index: Number,
		info: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	methods: {
		handleClick() {
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss" scoped>
.notice-list-container {
	border-top: 1px solid #ebedf0;
	display: flex;
	align-items: center;
	padding: 32rpx 0;
	&.active {
		border: none;
	}
	.img {
		width: 180rpx;
		height: 120rpx !important;
		border-radius: 16rpx;
		margin-right: 24rpx;
	}
	.right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 120rpx;
		flex: 1;
		color: #323233;
		font-size: 28rpx;
		.c-time {
			color: #c8c9cc;
			font-size: 24rpx;
		}
	}
}
</style>
