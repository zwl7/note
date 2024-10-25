<template>
	<view class="diploma-tip-container">
		<view class="sub-container" v-if="info.receive_status == 1">
			<view class="title">恭喜获得</view>
			<view class="project-name">{{ info.theme }}</view>
			<image v-if="info.level == 1" src="https://cdn-static.papa.com.cn/sport_online/rank_1.png" class="image" mode=""></image>
			<image v-if="info.level == 2" src="https://cdn-static.papa.com.cn/sport_online/rank_2.png" class="image" mode=""></image>
			<image v-if="info.level == 3" src="https://cdn-static.papa.com.cn/sport_online/rank_3.png" class="image" mode=""></image>
			<button class="button" @click="handelClick">领取证书</button>
		</view>
		<view class="sub-container" style="padding-top: 30rpx" v-else>
			<image src="https://cdn-static.papa.com.cn/sport_online/join-time.png" class="time_image" mode=""></image>
			<!-- <view class="title">比赛进行中</view> -->
			<!-- 	<view class="project-name">2023年全民健身线上运动会</view> -->
		</view>
	</view>
</template>
<script>
import { updateCertDetail } from '@/apis/mine.js';
export default {
	props: {
		info: {
			type: Object
		}
	},
	data() {
		return {};
	},
	methods: {
		handelClick() {
			updateCertDetail({ award_records_id: this.info.award_records_id }).then((res) => {
				if (res.code === 200) {
					getApp().globalData.currentWatchDiPloma = this.info.images;
					uni.navigateTo({
						url: '/pages/certificateShare/index'
					});
				} else {
					this.$public.showToast(res.message);
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.diploma-tip-container {
	padding: 0 64rpx;
	margin-top: 81rpx;
	.sub-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.title {
			font-size: 36rpx;
			font-weight: 600;
			color: rgba(50, 50, 51, 1);
			margin: 16rpx;
		}
		.project-name {
			font-size: 28rpx;
			line-height: 40rpx;
			font-weight: 400;
			color: rgba(100, 101, 102, 1);
			text-align: center;
		}
		.image {
			display: block;
			width: 300rpx;
			height: 300rpx;
			box-sizing: border-box;
			margin-bottom: 16rpx;
		}
		.time_image {
			display: block;
			width: 366rpx;
			height: 266rpx;
			box-sizing: border-box;
			margin-bottom: 60rpx;
		}
		.button {
			width: 394rpx;
			height: 80rpx;
			border-radius: 80rpx;
			background: linear-gradient(138.27deg, rgba(249, 78, 71, 1) 0%, rgba(240, 57, 44, 1) 100%);
			text-align: center;
			line-height: 80rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #fff;
		}
	}
}
</style>
