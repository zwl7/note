<template>
	<view class="list-item-container">
		<view class="top-container" @click="handleClick">
			<image :src="info.images" class="image" mode="aspectFill"></image>
			<view :class="['tag-info', 'tag-status-' + info.status]">{{ info.status_str }}</view>
			<view class="right-bottom-label" v-if="rightBottomLabel">{{ rightBottomLabel }}</view>
		</view>
		<view class="bottom-container">
			<view class="title">{{ info.name }}</view>
			<view class="bottom-icon">
				<view class="left">
					<view class="item">
						<uni-icons custom-prefix="iconfont" type="icon-liulan2" color="#969799" size="12"></uni-icons>
						<text class="title">{{ info.see }}</text>
					</view>
					<view class="item">
						<uni-icons custom-prefix="iconfont" type="icon-heart" color="#969799" size="12"></uni-icons>
						<text class="title">{{ info.love }}</text>
					</view>
					<view class="item">
						<uni-icons custom-prefix="iconfont" type="icon-fenxiang" color="#969799" size="12"></uni-icons>
						<text class="title">{{ info.share }}</text>
					</view>
				</view>
				<view class="right">
					<uni-icons custom-prefix="iconfont" type="icon-dot" color="#969799" size="18" @click="openInform"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import InformPop from '@/components/informPop.vue';
import { delActivityVideo } from '@/apis/mine.js';
import { changeVideo } from '@/utils/util.js';
export default {
	components: { InformPop },
	props: {
		info: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	data() {
		return {};
	},
	computed: {
		rightBottomLabel() {
			let time = this.info.upload_end_time * 1000;
			let now = new Date().getTime();
			let dayDiff = Math.floor((time - now) / 1000 / 60 / 60 / 24);
			if (dayDiff > 0) {
				return `距离截稿还有${dayDiff}天`;
			} else {
				return '';
			}
		}
	},
	methods: {
		handleClick() {
			this.$emit('click', this.info);
			let { activity_video_id } = this.info;
			uni.navigateTo({
				url: `/pages/videoDetail/index?type=2&activity_video_id=${activity_video_id}`
			});
		},
		openInform() {
			let _this = this;
			uni.showActionSheet({
				itemList: ['更换', '删除'],
				success: function (res) {
					let { tapIndex } = res;
					if (tapIndex == 0) {
						_this.handleUpdate();
					}
					if (tapIndex == 1) {
						_this.handleDel();
					}
				},
				fail: function (res) {
					console.log(res.errMsg);
				}
			});
		},
		handleDel() {
			let _this = this;
			uni.showModal({
				content: '删除视频后，本视频观看量和浏览量都会清除，继续参加比赛需要提交新的视频作品，是否继续删除',
				title: '提示',
				complete(res) {
					if (res.confirm) {
						_this.deleteFn();
					}
				}
			});
		},
		async deleteFn() {
			let res = await delActivityVideo({ activity_video_id: this.info.activity_video_id });
			if (res.code !== 200) {
				this.$public.showToast(res.message);
			} else {
				uni.showToast({
					title: '删除成功'
				});
				this.$emit('update');
			}
		},
		async handleUpdate() {
			let _this = this;
			uni.showModal({
				content: '更换视频上传新的视频会累加之前视屏的点赞量和浏览量，提交后需要审核通过后才能展示，是否继续更换？',
				title: '提示',
				complete(res) {
					if (res.confirm) {
						_this.updateFn();
					}
				}
			});
		},
		async updateFn() {
			let { match_activity_id, activity_video_id } = this.info;
			let res = await changeVideo();
			if (!res.status) {
				return;
			}
			getApp().globalData.currentChangeVideo = res;
			uni.navigateTo({
				url: `/pages/uploadWorks/index?type=edit&match_activity_id=${match_activity_id}&activity_video_id=${activity_video_id}`
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.list-item-container {
	width: 100%;
	background-color: #ffffff;
	border-radius: 24rpx;
	overflow: hidden;
	box-sizing: border-box;
}
.top-container {
	width: 100%;
	height: 382rpx;
	position: relative;

	.image {
		display: block;
		width: 100%;
		height: 100%;
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
		background-color: #ffae00;
		color: #ffffff;
		border-radius: 0 0 6rpx 0;
	}

	.tag-status-2 {
		background-color: #07c160;
		color: #ffffff;
	}
	.tag-status-3 {
		background-color: #a7aab0;
	}
	.right-bottom-label {
		position: absolute;
		bottom: 20rpx;
		right: 24rpx;
		font-size: 24rpx;
		min-height: 40rpx;
		padding: 0 16rpx;
		border-radius: 20rpx;
		background-color: $pp-color-primary;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
.bottom-container {
	background-color: #ffffff;
	padding: 24rpx;
	box-sizing: border-box;
	font-size: 28rpx;
	font-weight: 500;
	color: $pp-text-color;
	.bottom-icon {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 28rpx;
		.left {
			display: flex;
			align-items: center;
			color: #969799;
			.item {
				padding-right: 28rpx;
				.title {
					margin-left: 8rpx;
				}
			}
		}
	}
}
</style>
