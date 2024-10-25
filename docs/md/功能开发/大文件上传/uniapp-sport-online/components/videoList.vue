<template>
	<view class="video-list-container">
		<view v-for="(item, index) in list" :key="item.activity_video_id" class="content">
			<view class="video-cover" @click="handleClick(item)">
				<image class="cover" :src="item.images" mode="aspectFill" />
				<uni-icons class="play" custom-prefix="iconfont" type="icon-play" color="#fff" size="22"></uni-icons>
				<view class="play-count">
					<view class="c-left">
						<uni-icons class="icon" custom-prefix="iconfont" type="icon-min-play" color="#fff" size="10"></uni-icons>
						<text>{{ item.see }}</text>
					</view>
					<view class="c-time">{{ filterTime(item.time_len) }}</view>
				</view>
			</view>
			<view class="wrap">
				<view class="title ellipsis-2">{{ item.name }}</view>
				<view class="tag">
					<text>{{ item.type_two_str || item.project_name }}</text>
					<uni-icons class="play" custom-prefix="iconfont" type="icon-ddd" color="#C8C9CC" size="14" @click="openInform(item)"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 举报 -->
		<InformPop ref="inform" @confirm="handleConfirm" />
	</view>
</template>

<script>
import { formatTimeHM } from '@/utils/util.js';
import InformPop from '@/components/informPop.vue';
export default {
	name: 'VideoList',
	components: { InformPop },
	props: {
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		type: {
			type: String
		}
	},
	data() {
		return {
			info: {}
		};
	},
	methods: {
		handleClick(item) {
			let url = `/pages/videoDetail/index?activity_video_id=${item.activity_video_id}`;
			if (this.type == 'fit') {
				url = `/pages/videoDetail/index?video_type=fit&activity_video_id=${item.activity_video_id}`;
			}
			uni.navigateTo({
				url: url
			});
		},
		filterTime(time) {
			if (!time) {
				return '';
			}
			return formatTimeHM(time, '{h}:{i}');
		},
		openInform(item) {
			this.info = item;
			this.$refs.inform.open();
		},
		async handleConfirm() {
			let flag = await getApp().judgeIsAuth();
			if (!flag) {
				return;
			}
			let url = `/pages/reportVideo/index?activity_video_id=${this.info.activity_video_id}`;
			if (this.type == 'fit') {
				url = `/pages/reportVideo/index?video_type=fit&activity_video_id=${this.info.activity_video_id}`;
			}
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.video-list-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	color: #323233;
	.content {
		display: flex;
		flex-direction: column;
		border-radius: 16rpx;
		width: calc(50% - 10rpx);
		margin-bottom: 24rpx;
		overflow: hidden;
		background-color: #fff;
		.wrap {
			display: flex;
			flex-direction: column;
			padding: 24rpx;
			justify-content: space-between;
			flex: 1;
			.title {
				font-size: 28rpx;
				font-weight: 500;
				margin-bottom: 18rpx;
			}
			.tag text {
				display: inline;
				font-size: 24rpx;
				padding: 0 8rpx;
				color: #408bff;
				border-radius: 4rpx;
				border: 1px solid #408bff;
				&.active {
					color: #faab0c;
					border: 1px solid #faab0c;
				}
				&.active1 {
					color: #576b95;
					border: 1px solid #576b95;
				}
			}
			.tag {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}

		.video-cover {
			position: relative;
			width: 100%;
			height: 186rpx;
			color: #fff;
			font-size: 22rpx;
			.cover {
				width: 100%;
				height: 186rpx;
				object-fit: cover;
			}
			.play {
				position: absolute;
				left: 50%;
				top: 50%;
				width: 44rpx;
				height: 44rpx;
				opacity: 0.8;
				transform: translate(-50%, -50%);
			}
			.play-count {
				position: absolute;
				display: flex;
				justify-content: space-between;
				align-items: center;
				bottom: 8rpx;
				left: 12rpx;
				right: 12rpx;
				.c-left {
					display: flex;
					// align-items: center;
					vertical-align: middle;
					.icon {
						margin-right: 8rpx;
					}
				}
			}
		}
	}
}
</style>
