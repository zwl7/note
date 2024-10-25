<template>
	<view class="network-container">
		<view class="main-container">
			<view class="left-box">网络对弈</view>
			<view class="right-box">
				<scroll-view class="scroll-view" show-scrollbar="false" scroll-x="true">
					<view class="item" v-for="(item, index) in list" :key="index" @click="clickItem(item)">
						<image :src="item.images" mode="aspectFit" class="img"></image>
						<view class="title">{{ item.name }}</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	data() {
		return {};
	},
	methods: {
		clickItem(item) {
			this.$emit('click', item);
		}
	}
};
</script>
<style lang="scss" scoped>
.network-container {
	padding: 0 32rpx;
	box-sizing: border-box;
}
.main-container {
	width: 100%;
	height: 222rpx;
	background-color: $pp-color-primary;
	border-radius: 24rpx;
	overflow: hidden;
	border: 6rpx solid $pp-color-primary;
	display: flex;
	align-items: flex-start;
	.left-box {
		flex-shrink: 0;
		width: 80rpx;
		height: 100%;
		background-color: $pp-color-primary;
		display: flex;
		align-items: center;
		font-family: 'YouSheBiaoTiHei';
		font-size: 36rpx;
		font-weight: 400;
		letter-spacing: 5px;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		vertical-align: top;
	}
	.right-box {
		flex: 1;
		height: 100%;
		background-color: #fff;
		border-radius: 20rpx;
		overflow: hidden;

		.scroll-view {
			display: inline-block;
			white-space: nowrap;
			width: 100%;
			padding-left: 24rpx;
			.item {
				position: relative;
				display: inline-block;
				width: 116rpx;
				height: 122rpx;
				background-color: #fff5e1;
				margin-right: 16rpx;
				margin-top: 52rpx;
				border-radius: 16rpx;
				background: linear-gradient(0, rgba(255, 237, 209, 0) 0%, rgba(255, 219, 142, 0.78) 100%);
				.title {
					position: absolute;
					bottom: 0;
					width: 100%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 28rpx;
					font-weight: 400;
					color: #643c2b;
					text-align: center;
				}
				.img {
					position: absolute;
					top: -20rpx;
					display: block;
					width: 100%;
					height: 70rpx;
				}
			}
		}
	}
}
</style>
