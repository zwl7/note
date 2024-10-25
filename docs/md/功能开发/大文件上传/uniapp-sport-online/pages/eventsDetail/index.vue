<template>
	<view class="detail-container">
		<view class="top-box">
			<image :src="activityInfo.images" class="background-image" mode="cover"></image>
			<NavBar :nav-color="primaryColor" show-back />
			<view class="bottom-box">
				<view class="title">{{ activityInfo.name }}</view>
				<view class="line">
					<view class="icon">
						<uni-icons custom-prefix="iconfont" type="icon-shijian" color="#d2d3da" size="16"></uni-icons>
					</view>
					<view class="label">报名开始时间</view>
					<view class="value">{{ applyShowTime }}</view>
				</view>
				<view class="line">
					<view class="icon">
						<uni-icons custom-prefix="iconfont" type="icon-daojishi" color="#d2d3da" size="16"></uni-icons>
					</view>
					<view class="label">比赛开始时间</view>
					<view class="value">{{ matchShowTime }}</view>
				</view>
				<view class="line">
					<view class="icon">
						<uni-icons custom-prefix="iconfont" type="icon-jiangbei" color="#d2d3da" size="16"></uni-icons>
					</view>
					<view class="label">成绩公布时间</view>
					<view class="value">{{ awardsShowTime }}</view>
				</view>
			</view>
			<view class="bottom-radius"></view>
		</view>
		<view class="main-container">
			<view class="organization">
				<view class="item">
					<view class="label">主办单位:</view>
					<view class="value">{{ activityInfo.organizational_unit }}</view>
				</view>
				<view class="item">
					<view class="label">承办单位:</view>
					<view class="value">{{ activityInfo.hold_unit }}</view>
				</view>
			</view>
			<view class="content-box">
				<view class="title">赛事介绍</view>
				<view class="content">
					<rich-text :nodes="activityInfo.des"></rich-text>
				</view>
			</view>
		</view>
		<BottomButton :showButton="false" v-if="project_type_id == 2">
			<view class="bottom-button">
				<view class="share-button">
					<button class="button" open-type="share"></button>
					<uni-icons custom-prefix="iconfont" type="icon-fenxiang" color="#000000" size="20"></uni-icons>
					<view class="text">分享</view>
				</view>
				<button class="main-button" @click="handleApply">{{ buttonStr }}</button>
			</view>
		</BottomButton>
	</view>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { getMatchActivity, getMatchCountInfo } from '@/apis/index.js';
import { formatTimeBase, formatRichText } from '@/utils/util.js';
import BottomButton from '@/components/BottomButton.vue';
export default {
	components: {
		NavBar,
		BottomButton
	},
	data() {
		return {
			match_activity_id: '',
			primaryColor: 'transparent',
			activityInfo: {},
			applyShowTime: '',
			matchShowTime: '',
			awardsShowTime: '',
			buttonStatus: '', //lt in gt
			finished: false,
			isApply: false,
			project_type_id: '2'
		};
	},
	computed: {
		buttonStr() {
			let str = '立即报名';
			if (this.buttonStatus === 'lt') {
				str = `${this.applyShowTime}开始报名`;
			}

			if (this.buttonStatus === 'gt') {
				str = '报名已结束';
			}
			if (this.isApply) {
				str = '已报名';
			}
			return str;
		}
	},
	onLoad(options) {
		let { match_activity_id } = options;
		this.match_activity_id = match_activity_id;
		this.getDetail();
		this.getMatchInfo();
	},
	onShareAppMessage(res) {
		let that = this;
		let path = `/pages/eventsDetail/index?match_activity_id=${this.match_activity_id}`;
		return {
			title: this.activityInfo.name,
			path: path,
			imageUrl: this.activityInfo.images,
			withShareTicket: true
		};
	},
	methods: {
		async getDetail() {
			let res = await getMatchActivity({ match_activity_id: this.match_activity_id });
			if (res.code !== 200) {
				this.$public.showToast(res.message);
				return;
			}
			res.data.des = formatRichText(res.data.des);
			this.activityInfo = res.data;
			this.project_type_id = res.data.project_type_id;
			let applyTimeStatus = this.$public.judgeTime(res.data.apply_start_time, res.data.apply_end_time);
			this.buttonStatus = applyTimeStatus;
			this.applyShowTime = formatTimeBase(res.data.apply_start_time);
			this.matchShowTime = formatTimeBase(res.data.match_start_time);
			this.awardsShowTime = formatTimeBase(res.data.awards_time);
			this.finished = true;
		},
		async getMatchInfo() {
			let res = await getMatchCountInfo({ match_activity_id: this.match_activity_id });
			if (res.code == 200) {
				this.isApply = res.data.isApply;
			}
		},
		async handleApply() {
			let str = '';
			if (this.isApply) {
				this.$public.showToast('已报名，请勿重复报名');
				return;
			}
			if (this.buttonStatus === 'lt') {
				str = `${this.applyShowTime}开始报名`;
			}

			if (this.buttonStatus === 'gt') {
				str = '报名已结束';
			}

			if (str) {
				this.$public.showToast(str);
				return;
			}
			if (!this.finished) {
				return;
			}
			let flag = await getApp().judgeIsAuth();
			if (!flag) {
				return;
			}
			getApp().globalData.applyCurrentActivity = this.activityInfo;
			uni.navigateTo({
				url: `/pages/apply/index?match_activity_id=${this.activityInfo.match_activity_id}`
			});
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
	height: 974rpx;
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
		min-height: 424rpx;
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
		.line {
			display: flex;
			align-items: flex-start;
			font-size: 26rpx;
			font-weight: 400;
			margin-bottom: 28rpx;
			.icon {
				flex-shrink: 0;
			}
			.label {
				flex-shrink: 0;
				color: rgba(255, 255, 255, 0.65);
				margin: 0 24rpx 0 32rpx;
			}
			.value {
				flex: 1;
				color: rgba(255, 255, 255, 1);
			}
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
