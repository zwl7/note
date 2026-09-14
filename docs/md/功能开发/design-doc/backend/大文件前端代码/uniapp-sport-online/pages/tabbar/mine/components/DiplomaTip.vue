<template>
	<view class="notice-container">
		<view class="notice-container-main" @click="handleSkip">
			<view class="main">
				<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" :vertical="true">
					<swiper-item class="swiper-item">
						<view class="content">不在本平台参赛的项目，点此处前往领取证书</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="forward" :color="primaryColor" size="18"></uni-icons>
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
		return {
			primaryColor: '#ED6A0C'
		};
	},
	methods: {
		handleSkip() {
			uni.navigateTo({
				url: '/pages/certificate/index'
			});
			return;
			uni.navigateTo({
				url: '/pages/certificateShare/index'
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.notice-container-main {
	width: 100%;
	height: 82rpx;
	border-radius: 82rpx;
	background-color: #ffebe2;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding: 0 28rpx;
	.left {
		flex-shrink: 0;
		.laba {
			display: block;
			width: 36rpx;
			height: 36rpx;
		}
	}
	.main {
		flex: 1;
		height: 100%;
		margin: 0 20rpx;
		.swiper {
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			align-items: center;
			overflow: hidden;
			.content {
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 28rpx;
				font-weight: 400;
				color: #ed6a0c;
			}
		}
	}
	.right {
		flex-shrink: 0;
	}
}
</style>
