<template>
	<view>
		<PrivacyPopup></PrivacyPopup>
		<view class="main-container">
			<image src="../../static/imgs/success.png" class="success" mode=""></image>
			<view class="title">报名成功</view>
			<view class="tip-box">
				<view class="tip-title">请在以下时间内完成作品上传</view>
				<view class="time">{{ showStr }}</view>
			</view>
		</view>
		<BottomButton @submit="handleClick" :title="buttonStr" />
	</view>
</template>

<script>
import BottomButton from '@/components/BottomButton.vue';
import { formatTimeBase, changeVideo } from '@/utils/util.js';
import PrivacyPopup from '@/components/PrivacyPopup.vue';
export default {
	components: {
		BottomButton,
		PrivacyPopup
	},
	data() {
		return {
			showStr: '',
			startStr: '',
			buttonStatus: '' //lt in gt
		};
	},
	computed: {
		buttonStr() {
			let str = '上传作品';
			if (this.buttonStatus === 'lt') {
				str = `${this.startStr}开始上传`;
			}

			if (this.buttonStatus === 'gt') {
				str = '暂停上传';
			}
			return str;
		}
	},
	onLoad() {
		let applyCurrentActivity = getApp().globalData.applyCurrentActivity;
		let { upload_start_time, upload_end_time, match_activity_id } = applyCurrentActivity;
		let startStr = formatTimeBase(upload_start_time);
		let endStr = formatTimeBase(upload_end_time);
		let showStr = `${startStr} 至 ${endStr}`;
		this.showStr = showStr;
		let uploadTimeStatus = this.$public.judgeTime(upload_start_time, upload_end_time);
		this.startStr = startStr;
		this.buttonStatus = uploadTimeStatus;
		this.match_activity_id = match_activity_id;
	},
	methods: {
		async handleClick() {
			let str = '';
			if (this.buttonStatus === 'lt') {
				str = `${this.startStr}开始上传`;
			}

			if (this.buttonStatus === 'gt') {
				str = '暂停上传';
			}
			if (str) {
				this.$public.showToast(str);
				return;
			}

			let res = await changeVideo();
			if (!res.status) {
				return;
			}
			getApp().globalData.currentChangeVideo = res;
			uni.navigateTo({
				url: `/pages/uploadWorks/index?type=add&match_activity_id=${this.match_activity_id}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.main-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 180rpx 60rpx;
	.success {
		display: block;
		width: 186rpx;
		height: 186rpx;
	}
	.title {
		font-size: 36rpx;
		color: $pp-text-color;
		font-weight: 600;
		margin-top: 32rpx;
	}
	.tip-box {
		width: 100%;
		background-color: #f2f3f5;
		border-radius: 24rpx;
		padding: 32rpx;
		box-sizing: border-box;
		margin-top: 72rpx;
		.tip-title {
			color: #969799;
			font-size: 26rpx;
			line-height: 1.5;
		}
		.time {
			font-size: 26rpx;
			color: $pp-text-color;
			line-height: 1.5;
			margin-top: 10rpx;
		}
	}
}
</style>
