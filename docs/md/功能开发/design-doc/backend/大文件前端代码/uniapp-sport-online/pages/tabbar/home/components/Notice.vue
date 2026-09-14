<template>
	<view class="notice-container">
		<view class="notice-container-main">
			<view class="left">
				<image src="../../../../static/imgs/laba.png" class="laba" mode=""></image>
			</view>
			<view class="main">
				<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" :vertical="true">
					<swiper-item v-for="(item, index) in list" :key="index" class="swiper-item" @click="clickItem(item)">
						<view class="content">{{ item.name }}</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="right" @click="clickIcon">
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
					return []
				}
			}
		},
		data() {
			return {
				primaryColor: '#f5463c'
			}
		},
		methods: {
			clickItem(item) {
				this.$emit('click', item)
			},
			clickIcon() {
				this.$emit('clickIcon')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.notice-container {
		padding: 0 32rpx;
		margin-top: 48rpx;
	}

	.notice-container-main {
		width: 100%;
		height: 92rpx;
		border-radius: 16rpx;
		background-color: #fff4f4;
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
					color: #90240e;
				}
			}
		}

		.right {
			flex-shrink: 0;
		}
	}
</style>