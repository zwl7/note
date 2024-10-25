<template>
	<view class="list-item-container" @click="handleClick">
		<view class="item-left">
			<image :src="info.images" class="image" mode="aspectFill"></image>
			<view :class="['tag-info', 'time_status_' + info.time_status]">{{ timeStr }}</view>
		</view>
		<view class="item-right">
			<view class="title">{{ info.name }}</view>
			<view class="view-count"></view>
			<view class="bottom-info">
				<view class="tags_box">
					<view class="tags">{{ info.project_name }}</view>
					<view class="triangle" v-if="info.is_get == 2">获得名次</view>
				</view>
				<view v-if="info.time_status == 2" :class="['bottom-button', { 'bottom-button_upload': info.is_upload == 1 }]" @click.prevent="handleUpload">
					{{ buttonStr }}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { changeVideo } from '@/utils/util.js';
const timeStatusMap = {
	1: '报名中',
	2: '比赛中',
	3: '比赛结束'
};
export default {
	props: {
		info: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	computed: {
		//比赛状态time_status：报名中1，比赛中2，比赛结束3
		//是否上传作品is_upload：1未上传，2已上传
		//是否获得名次is_get： 1未获得，2已获得
		//获得的名次值rank：1
		timeStr() {
			if (!this.info.time_status) {
				return '';
			}
			return timeStatusMap[this.info.time_status];
		},
		buttonStr() {
			if (this.info.is_upload == 1) {
				return '上传作品';
			}
			if (this.info.is_upload == 2) {
				return '已传作品';
			}
		},
		buttonStatus() {
			let applyTimeStatus = this.$public.judgeTime(this.info.upload_start_time, this.info.upload_end_time);
			return applyTimeStatus;
		}
	},
	data() {
		return {};
	},
	methods: {
		async handleClick() {
			this.$emit('click');
			let { match_activity_id } = this.info;
			uni.navigateTo({
				url: `/pages/joinEventsDetail/index?match_activity_id=${match_activity_id}`
			});
		},
		async handleUpload() {
			let str = '';
			if (this.buttonStatus === 'gt') {
				str = '上传作品结束';
			}
			if (str) {
				this.$public.showToast(str);
				return;
			}
			let { match_activity_id } = this.info;
			let res = await changeVideo();
			if (!res.status) {
				return;
			}
			getApp().globalData.currentChangeVideo = res;
			uni.navigateTo({
				url: `/pages/uploadWorks/index?type=add&match_activity_id=${match_activity_id}`
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.list-item-container {
	width: 100%;
	height: 222rpx;
	background-color: #ffffff;
	border-radius: 24rpx;
	overflow: hidden;
	display: flex;
	box-sizing: border-box;
	padding: 24rpx;

	.item-left {
		width: 262rpx;
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
		.tag-info {
			position: absolute;
			display: inline-block;
			top: 0;
			left: 0;
			font-size: 24rpx;
			line-height: 1.5;
			font-weight: 400;
			padding: 4rpx 10rpx;
			background-color: #07c160;
			color: #ffffff;
			border-radius: 0 0 6rpx 0;
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
			font-weight: 500;
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
			color: #666;
			margin-top: 6rpx;
		}
		.bottom-info {
			flex-shrink: 0;
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: flex-end;
			.tags_box {
				display: flex;
				align-items: center;
			}

			.tags {
				flex-shrink: 0;
				font-size: 24rpx;
				font-weight: 400;
				height: fit-content;
				color: #faab0c;
				border-radius: 4rpx;
				background-color: #ffecde;
				padding: 4rpx 8rpx;
			}
			.triangle {
				flex-shrink: 0;
				height: 40rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #d07300;
				min-width: 110rpx;
				background-image: url('../../../../static/imgs/label_bg.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
				padding: 0 20rpx 0 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 8rpx;
			}
			.bottom-button {
				width: 130rpx;
				height: 48rpx;
				border-radius: 48rpx;
				box-sizing: border-box;
				border: 1rpx solid #c8c9cc;
				font-size: 24rpx;
				font-weight: 400;
				color: #c8c9cc;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
}

.time_status_1 {
	background-color: #07c160 !important;
}
.time_status_2 {
	background-color: #f0392c !important;
}
.time_status_3 {
	background-color: #a7aab0 !important;
}
.bottom-button_upload {
	background: linear-gradient(138.27deg, #f94e47 0%, #f0392c 100%);
	border: none !important;
	color: #ffffff !important;
}
</style>
