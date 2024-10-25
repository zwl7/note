<template>
	<view class="list-item-container" @click="toDetail">
		<view class="item-left">
			<image :src="info.images" class="image" mode=""></image>
			<view class="tag-info">
				<image :src="medal_1" v-if="info.level == 1" class="label-image" mode=""></image>
				<image :src="medal_2" v-if="info.level == 2" class="label-image" mode=""></image>
				<image :src="medal_3" v-if="info.level == 3" class="label-image" mode=""></image>
			</view>
		</view>
		<view class="item-right">
			<view class="title">{{ info.match_activity_name }}</view>
			<view class="view-count">
				<view class="tags">{{ info.project_name }}</view>
			</view>
			<view class="bottom-info">{{ filterTime(info.cert_time) }}</view>
		</view>
	</view>
</template>
<script>
import { formatTimeBase } from '@/utils/util.js';
export default {
	props: {
		info: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	data() {
		return {
			medal_1: 'https://cdn-static.papa.com.cn/sport_online/medal_1.png',
			medal_2: 'https://cdn-static.papa.com.cn/sport_online/medal_2.png',
			medal_3: 'https://cdn-static.papa.com.cn/sport_online/medal_3.png'
		};
	},
	methods: {
		toDetail() {
			getApp().globalData.currentWatchDiPloma = this.info.images;
			uni.navigateTo({
				url: '/pages/certificateShare/index'
			});
		},
		toUpload() {
			uni.navigateTo({
				url: '/pages/uploadWorks/index'
			});
		},
		filterTime(time) {
			return formatTimeBase(time);
		}
	}
};
</script>
<style lang="scss" scoped>
.list-item-container {
	width: 100%;
	height: 298rpx;
	background-color: #ffffff;
	border-radius: 24rpx;
	overflow: hidden;
	display: flex;
	box-sizing: border-box;
	padding: 24rpx;

	.item-left {
		width: 228rpx;
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
			object-fit: fill;
		}
		.tag-info {
			position: absolute;
			top: 0;
			left: 22rpx;
			.label-image {
				display: block;
				width: 50rpx;
				height: 68rpx;
			}
		}
		.tag-status-1 {
			background-color: #f0392c;
			color: #ffffff;
		}
		.tag-status-2 {
			background-color: #a7aab0;
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
			font-weight: 600;
			color: $pp-text-color;
			width: 100%;
			white-space: normal;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.view-count {
			flex: 1;
			padding-top: 24rpx;
			.tags {
				display: inline-block;
				flex-shrink: 0;
				font-size: 24rpx;
				font-weight: 400;
				height: fit-content;
				background-color: #ffecde;
				border-radius: 4rpx;
				color: #ff8a06;
				padding: 4rpx 12rpx;
			}
		}
		.bottom-info {
			flex-shrink: 0;
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: flex-end;
			color: #c8c9cc;
			font-size: 24rpx;
		}
	}
}
</style>
