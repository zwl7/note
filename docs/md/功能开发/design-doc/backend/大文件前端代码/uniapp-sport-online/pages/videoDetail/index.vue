<template>
	<view class="video-detail-container">
		<video class="video" :src="url" :direction="90" autoplay @fullscreenchange="fullscreenchange" />
		<view class="video-content">
			<view class="top">
				<view class="v-title">{{ info.name }}</view>
				<view class="v-statistics">
					<view class="tag">{{ info.project_name }}</view>
					<!-- 暂时没这个字段 -->
					<view class="hot-count">
						<!-- 	<image src="../../static/imgs/hot.png" />
					<view>2万</view> -->
					</view>
					<div class="play-count">{{ info.see }}播放</div>
					<div class="time">{{ info.showTime }}</div>
				</view>
			</view>
			<view class="report" v-if="video_type != 'fit' && info.status == 2" @click="openInform(item)">
				<uni-icons custom-prefix="iconfont" type="icon-report" color="#C8C9CC" size="16"></uni-icons>
				<view class="title">举报</view>
			</view>
			<view class="brief-text">
				<view class="brief-title">简介</view>
				<view class="brief-content">
					<rich-text :nodes="info.des" space="emsp"></rich-text>
				</view>
			</view>
		</view>
		<!-- 教练 暂时不做  -->
		<!-- 	<view class="coach-content">
			<view class="introduce">
				<image src="../../static/imgs/apply_group.png" class="coach-photo" />
				<view class="coach-info">
					<view class="coach-name">小明</view>
					<view class="coach-des">健身指导教授，拥有多年从业经验</view>
				</view>
			</view>
		</view> -->
		<!-- 课程 -->
		<!-- <view class="course"> 暂时不做 </view> -->
		<BottomButton :showButton="false" class="bottm_box">
			<view class="footer">
				<view class="f-item" v-if="video_type != 'fit'" @click="shareToggle">
					<uni-icons custom-prefix="iconfont" type="icon-fenxiang" color="#646566" size="20"></uni-icons>
					<view class="count">{{ info.share }}</view>
				</view>
				<button class="f-item" open-type="share" v-else>
					<uni-icons custom-prefix="iconfont" type="icon-fenxiang" color="#646566" size="20"></uni-icons>
					<view class="count">{{ info.share }}</view>
				</button>
				<view class="f-item" @click="like">
					<uni-icons custom-prefix="iconfont" type="icon-heart" :color="info.love > 0 ? 'red' : '#646566'" size="20"></uni-icons>
					<view class="count">{{ info.love }}</view>
				</view>
			</view>
		</BottomButton>

		<!-- 分享 -->
		<uni-popup ref="share" type="share" safeArea class="share">
			<view class="share-container">
				<view class="s-content">
					<view class="s-title">立即分享给好友</view>
					<view class="s-list">
						<button open-type="share" class="s-item-btn" @click="handeClick(1)">
							<image src="../../static/imgs/wx.png" mode=""></image>
							<view class="i-name">微信</view>
						</button>
						<!-- 				<button class="s-item-btn" @click="handeClick(2)">
							<image src="../../static/imgs/pyq.png" mode=""></image>
							<view class="i-name">朋友圈</view>
						</button> -->
						<button class="s-item-btn" @click="handeClick(3)">
							<image src="../../static/imgs/haibao.png" mode=""></image>
							<view class="i-name">分享海报</view>
						</button>
					</view>
				</view>
				<view class="s-footer" @click="shareClose">取消</view>
			</view>
		</uni-popup>
		<BigDialog ref="BigDialog" show_image image_url="https://cdn-static.papa.com.cn/sport_online/no_video.png" tip="当前视频不存在" @cancelEvent="cancelEvent" />
		<!-- 举报 -->
		<InformPop ref="inform" @confirm="handleConfirm" />
	</view>
</template>

<script>
import { uploadVideoCount } from '@/apis/common.js';
import { getActivityVideoDetail } from '@/apis/mine.js';
import { getFitDetail } from '@/apis/index.js';
import BottomButton from '@/components/BottomButton.vue';
import BigDialog from '@/components/BigDialog.vue';
import { handleQrcodeScene, formatTimeBase } from '@/utils/util.js';
import InformPop from '@/components/informPop.vue';
export default {
	components: {
		BottomButton,
		BigDialog,
		InformPop
	},
	data() {
		return {
			activity_video_id: '',
			url: '',
			info: {},
			type: '',
			video_type: '',
			status: ''
		};
	},
	onLoad(options) {
		if (options.scene) {
			let obj = handleQrcodeScene(options.scene);
			options.activity_video_id = obj.id;
			options.video_type = obj.vt;
		}
		let { activity_video_id, type, video_type } = options;
		this.activity_video_id = activity_video_id;
		this.video_type = video_type;
		this.type = type;
		this.getDetail();
		this.uploadVideoCount(2);
	},
	methods: {
		async shareToggle() {
			let flag = await getApp().judgeIsAuth();
			if (!flag) {
				return;
			}
			let message = '';
			if (this.status == 1) {
				message = '视频审核中，无法点赞转发';
			}
			if (this.status == 3) {
				message = '视频审核不通过，无法点赞转发';
			}
			if (message) {
				this.$public.showToast(message);
				return;
			}

			this.$refs.share.open();
		},
		shareClose() {
			this.$refs.share.close();
		},
		openInform(item) {
			this.$refs.inform.open();
		},
		async handleConfirm() {
			let flag = await getApp().judgeIsAuth();
			if (!flag) {
				return;
			}
			let url = `/pages/reportVideo/index?activity_video_id=${this.activity_video_id}`;
			if (this.type == 'fit') {
				url = `/pages/reportVideo/index?video_type=fit&activity_video_id=${this.activity_video_id}`;
			}
			uni.navigateTo({
				url: url
			});
		},
		async getDetail() {
			let parmas = {
				activity_video_id: this.activity_video_id
			};
			if (this.type) {
				parmas.type = this.type;
			}
			let func = getActivityVideoDetail;
			if (this.video_type == 'fit') {
				func = getFitDetail;
			}
			let res = await func(parmas);
			if (res.code === 200) {
				if (!res.data) {
					this.$public.showToast('暂无数据');
				}
				let type_two_map = {
					1: '健身指导',
					2: '伤病处理',
					3: '其他'
				};
				if (res.data.type == 2) {
					res.data.project_name = type_two_map[res.data.type_two];
				}
				if (this.video_type == 'fit') {
					res.data.showTime = formatTimeBase(Number(res.data.c_time), '{y}/{m}/{d} {h}:{i}:{s}');
				} else {
					res.data.showTime = res.data.c_time.replace(/-/gi, '/');
				}

				this.url = res.data.url;
				this.info = res.data;
				this.status = res.data.status;
			} else {
				this.$refs['BigDialog'].showDialog();
			}
		},
		cancelEvent() {
			uni.switchTab({
				url: '/pages/tabbar/home/index'
			});
		},
		fullscreenchange(e) {
			console.log(e);
		},
		async handeClick(type) {
			switch (type) {
				case 1:
					this.uploadVideoCount(3);
					break;
				case 2:
					this.onShareTimeline();
					this.uploadVideoCount(3);
					break;
				case 3:
					let app = getApp();
					let obj = {
						video_name: this.info.name,
						show_time: this.info.showTime,
						member_avatar: this.info.member_avatar,
						member_nick_name: this.info.member_nick_name,
						see: this.info.see,
						love: this.info.love,
						user_name: app.globalData.userInfo.nick_name,
						user_avatar: app.globalData.userInfo.avatar_url,
						match_name: this.info.match_activity_name,
						images: this.info.images,
						activity_video_id: this.activity_video_id,
						video_type: this.video_type || 'user'
					};
					getApp().globalData.shareVideoInfo = obj;
					uni.navigateTo({
						url: '/pages/videoDetailPainter/index'
					});
					break;
			}
			this.shareClose();
		},
		// type 类型:1点赞，2浏览量，3分享。
		async uploadVideoCount(type) {
			const res = await uploadVideoCount({ type, activity_video_id: this.activity_video_id });
			if (res.code == 200) {
				if (type == 1) {
					this.info.love += 1;
				}
			} else {
				this.$public.showToast(res.message);
			}
		},
		async like() {
			let message = '';
			if (this.status == 1) {
				message = '视频审核中，无法点赞转发';
			}
			if (this.status == 3) {
				message = '视频审核不通过，无法点赞转发';
			}

			if (message) {
				this.$public.showToast(message);
				return;
			}
			let flag = await getApp().judgeIsAuth();
			if (!flag) {
				return;
			}

			this.uploadVideoCount(1);
		}
	},
	onShareAppMessage(res) {
		let that = this;
		let path = `/pages/videoDetail/index?activity_video_id=${this.activity_video_id}`;
		if (this.video_type) {
			path = `/pages/videoDetail/index?video_type=${this.video_type}&activity_video_id=${this.activity_video_id}`;
		}
		console.log(path);
		return {
			title: this.info.name,
			path: path,
			imageUrl: this.info.images,
			withShareTicket: true
		};
	}
};
</script>

<style lang="scss">
.video-detail-container {
	.video {
		width: 100%;
		height: 422rpx;
		display: block;
		margin: 0 auto;
	}
	.video-content {
		padding: 32rpx;
		padding-bottom: 100px;
		margin-bottom: 24rpx;
		background-color: #fff;
		position: relative;
		.top {
			padding-right: 50rpx;
		}
		.v-title {
			font-size: 36rpx;
			font-weight: 600;
		}
		.v-statistics {
			display: flex;
			align-items: center;
			margin: 20rpx 0 40rpx;
			font-size: 24rpx;
			color: #969799;
			.tag {
				color: #408bff;
				border-radius: 4rpx;
				border: 1px solid #408bff;
				padding: 0 8rpx;
			}
			.hot-count {
				display: flex;
				align-items: center;
				color: #f4443a;
				padding: 0 16rpx;
				image {
					width: 22rpx;
					height: 24rpx;
				}
			}
			.time {
				padding: 0 8rpx;
			}
		}
		.brief-text {
			font-size: 26rpx;
			color: #646566;
			.brief-title {
				font-size: 28rpx;
				padding-bottom: 16rpx;
				font-weight: 500;
				color: #323233;
			}
			.brief-content {
				text-indent: 2em;
			}
		}

		.report {
			position: absolute;
			top: 32rpx;
			right: 32rpx;
			color: #c8c9cc;
			font-size: 22rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
	.coach-content {
		padding: 32rpx;
		background-color: #fff;
		.introduce {
			display: flex;
			align-items: center;
			padding-bottom: 32rpx;
			border-bottom: 1px solid #ebedf0;
			.coach-photo {
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				margin-right: 24rpx;
			}
			.coach-info {
				display: flex;
				flex-direction: column;
				font-size: 24rpx;
				color: #969799;
				flex: 1;
				.coach-name {
					color: #323233;
					font-size: 32rpx;
					font-weight: 600;
					padding-bottom: 10rpx;
				}
			}
		}
		.course {
			border: 1px solid red;
		}
	}
	.footer {
		display: flex;
		justify-content: center;
		color: #646566;
		font-size: 28rpx;
		background-color: #fff;
		padding: 32rpx;
		.f-item {
			display: flex;
			align-items: center;
			background-color: #fff;
			line-height: 1;
			.count {
				padding-left: 16rpx;
			}
			&:last-child {
				padding-left: 226rpx;
			}
		}
	}
}
//  分享
.share .share-container {
	padding: 40rpx 0 0;
	border-radius: 24rpx 24rpx 0 0;
	background-color: #fff;
	text-align: center;
	.s-title {
		font-size: 28rpx;
		padding-bottom: 40rpx;
	}
	.s-list {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		padding: 0 32rpx 16rpx;
		border-bottom: 16rpx solid #f7f8fa;
		.s-item-btn {
			flex: 1;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			image {
				width: 96rpx;
				height: 96rpx;
				margin-bottom: 16rpx;
			}
			.i-name {
				line-height: normal;
				font-size: 24rpx;
			}
		}
	}
	.s-footer {
		font-size: 32rpx;
		color: #646566;
		padding: 26rpx 0;
	}
}
.bottm_box ::v-deep .bottom-button {
	padding-left: 0 !important;
	padding-right: 0 !important;
	padding-top: 0 !important;
}
</style>
