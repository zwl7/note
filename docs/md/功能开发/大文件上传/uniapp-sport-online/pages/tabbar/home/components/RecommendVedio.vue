<template>
	<view class="recommend-vedio-container">
		<view class="recommend-vedio-title">
			<CommonTitle title="健身指导" :showMore="true" @more="toFitnessGuide" />
		</view>
		<scroll-view class="scroll-view" scroll-x="true">
			<view class="item" v-for="(item, index) in list" :key="index" @click="handleClick(item)">
				<view class="item-container">
					<view class="item-left">
						<image :src="item.images" class="image" mode="aspectFill"></image>
						<view class="bottom-info">
							<view class="i-top">
								<uni-icons class="icon" custom-prefix="iconfont" type="icon-min-play" color="#fff" size="12"></uni-icons>
								<text>{{ item.see }}</text>
							</view>
							<view>{{ filterTime(item.time_len) }}</view>
						</view>
					</view>
					<view class="item-right">
						<view class="title ellipsis-2">{{ item.name }}</view>
						<view class="bottom-info">
							<view class="tag">{{ item.type_two_str }}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
import CommonTitle from './CommonTitle.vue';
import { formatTimeHM } from '@/utils/util.js';
export default {
	components: {
		CommonTitle
	},
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
		handleClick(item) {
			this.$emit('click', item);
		},
		toFitnessGuide() {
			uni.navigateTo({
				url: '/pages/fitnessGuide/index'
			});
		},
		filterTime(time) {
			if (!time) {
				return '';
			}
			return formatTimeHM(time, '{h}:{i}');
		}
	}
};
</script>
<style lang="scss" scoped>
.recommend-vedio-container {
	margin-top: 40rpx;
}
.recommend-vedio-title {
	padding: 0 32rpx;
}
.scroll-view {
	display: inline-block;
	white-space: nowrap;
	width: 100%;
	padding-left: 32rpx;
	.item {
		display: inline-block;
		width: 636rpx;
		height: 208rpx;
		margin-right: 24rpx;
		border-radius: 24rpx;
		box-sizing: border-box;
		background: #ffffff;
		overflow: auto;
	}
	.item-container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
		padding: 24rpx;
		display: flex;
	}
	.item-left {
		width: 264rpx;
		height: 100%;
		background-color: #c8c9cc;
		border-radius: 16rpx;
		overflow: hidden;
		flex-shrink: 0;
		position: relative;
		.image {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.bottom-info {
			position: absolute;
			display: flex;
			justify-content: space-between;
			width: 100%;
			bottom: 0;
			left: 0;
			padding: 14rpx;
			box-sizing: border-box;
			color: #fff;
			font-weight: 400;
			font-size: 22rpx;
			display: flex;
			align-items: center;
			.icon {
				margin-right: 8rpx;
			}
		}
	}
	.item-right {
		flex: 1;
		height: 100%;
		padding-left: 24rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		.title {
			font-size: 28rpx;
			font-weight: 500;
			color: $pp-text-color;
			width: 100%;
			white-space: normal;
		}

		.bottom-info {
			flex-shrink: 0;
			display: flex;
			.author {
				flex: 1;
				display: flex;
				align-items: center;
				overflow: hidden;
				color: #666;
				font-size: 24rpx;
			}
			.tag {
				flex-shrink: 0;
				font-size: 24rpx;
				font-weight: 400;
				color: #faab0c;
				border-radius: 2px;
				padding: 0 8rpx;
				margin-top: 16rpx;
				border: 1px solid #faab0c;
			}
		}
	}
}
</style>
