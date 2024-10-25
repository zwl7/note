<template>
	<view class="detail-container">
		<PageLoading v-if="loading" />
		<view class="top-box">
			<image :src="activityInfo.images" class="background-image" mode="cover"></image>
			<view class="bottom-box">
				<view class="title">{{ activityInfo.name }}</view>
			</view>
			<view class="bottom-radius"></view>
		</view>
		<view class="main-container">
			<view class="organization">
				<view class="item">
					<view class="label">主办单位:</view>
					<view class="value">{{ activityInfo.organizer }}</view>
				</view>
				<view class="item">
					<view class="label">承办单位:</view>
					<view class="value">{{ activityInfo.hold_unit }}</view>
				</view>
			</view>
			<view class="content-box">
				<view class="title">赛会介绍</view>
				<view class="content">
					<rich-text :nodes="activityInfo.des"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getMathDetail } from '@/apis/common.js';
import { formatTimeBase, formatRichText } from '@/utils/util.js';
import PageLoading from '@/components/PageLoading.vue';
export default {
	components: {
		PageLoading
	},
	data() {
		return {
			activityInfo: {},
			loading: false,
			isApply: false
		};
	},

	onLoad(options) {
		this.loading = true;
		this.getDetail();
	},
	onShareAppMessage(res) {
		let that = this;
		let path = `/pages/tabbar/about/index`;
		return {
			title: '全民健身线上赛',
			path: path,
			withShareTicket: true
		};
	},
	methods: {
		async getDetail() {
			let res = await getMathDetail({});
			if (res.code !== 200) {
				this.$public.showToast(res.message);
				return;
			}
			res.data.des = formatRichText(res.data.des);
			this.activityInfo = res.data;
			this.loading = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.detail-container {
	min-height: 100vh;
	box-sizing: border-box;
	background-color: #fff;
	padding-bottom: 160rpx;
}
.top-box {
	width: 100%;
	height: 554rpx;
	background-color: #f7f8fa;
	position: relative;
	overflow: hidden;

	.background-image {
		position: absolute;
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
	}
	.bottom-box {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		min-height: 224rpx;
		background: linear-gradient(180deg, rgba(58, 70, 119, 0) 0%, rgba(29, 35, 69, 0.66) 51.44%, rgba(27, 33, 66, 1) 100%);
		padding: 0 46rpx 40rpx;
		box-sizing: border-box;
		color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		.title {
			font-size: 36rpx;
			font-weight: 600;
			margin-bottom: 34rpx;
		}
	}
	.bottom-radius {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 32rpx;
		background-color: #fff;
		border-radius: 32rpx 32rpx 0 0;
	}
}

.main-container {
	.organization {
		font-size: 26rpx;
		font-weight: 400;
		padding: 0 32rpx;
		border-bottom: 24rpx solid #f7f8fa;
		.item {
			display: flex;
			align-items: flex-start;
			color: $pp-text-color;
			margin-bottom: 24rpx;
			.label {
				flex-shrink: 0;
			}
			.value {
				flex: 1;
				margin-left: 20rpx;
			}
		}
	}
	.content-box {
		padding: 32rpx;
		.title {
			font-size: 32rpx;
			font-weight: 600;
			color: $pp-text-color;
			margin-bottom: 32rpx;
		}
		.content {
			min-height: 200rpx;
		}
	}
}

.bottom-button {
	display: flex;
	align-items: center;
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
.share-button {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #fff;
	margin-right: 60rpx;
	position: relative;
	.text {
		font-size: 20rpx;
		line-height: 1;
		color: #969799;
		margin-top: 10rpx;
	}
	.uni-icons {
		display: inline-block;
		padding: 0 !important;
		margin: 0 !important;
	}
	.button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: transparent;
	}
}
.content::v-deep img {
	width: auto !important;
	height: auto !important;
	max-width: 100% !important;
	max-height: 100% !important;
}
</style>
