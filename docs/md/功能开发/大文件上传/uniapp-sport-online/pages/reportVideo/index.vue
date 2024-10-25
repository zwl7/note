<template>
	<view class="page-container">
		<view class="title">举报内容</view>
		<view class="video-container">
			<view class="left">
				<view class="name">{{ info.name }}</view>
				<text class="tags">{{ info.project_name }}</text>
				<view class="report_type" @click="changeType">{{ type_str }}</view>
			</view>
			<view class="content">
				<view class="video-cover" @click="handleClick(info)">
					<image class="cover" :src="info.images" />
					<uni-icons class="play" custom-prefix="iconfont" type="icon-play" color="#fff" size="22"></uni-icons>
					<view class="play-count">
						<view class="c-left">
							<uni-icons class="icon" custom-prefix="iconfont" type="icon-min-play" color="#fff" size="10"></uni-icons>
							<text>{{ info.see }}</text>
						</view>
						<view class="c-time">{{ filterTime(info.time_len) }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="feedback-edit">
			<view class="remark">
				<textarea v-model="des" :maxlength="50" placeholder-style="color:#B5B5B5;font-size:28rpx" auto-height placeholder="请输入回复内容" class="textarea" />
				<view class="remark-count">{{ des.length }}/50 </view>
			</view>
		</view>
		<view class="submit-bth" @click="submit">提交</view>

		<uni-popup ref="selectProject" type="bottom">
			<view class="select-project-container">
				<view class="title-out-box">
					<view class="title-box">
						<view class="titles">举报</view>
						<view class="tip">请选择举报原因</view>
					</view>
				</view>

				<view class="main-box">
					<view v-for="(item, index) in list" :key="index" class="cell" @click="handleChange(item)">{{ item.label }}</view>
				</view>
				<view class="bottom-box" @click="cancel">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { formatTimeHM } from '@/utils/util.js';
import SelectProject from '@/components/Select/index.vue';
import { getActivityVideoDetail } from '@/apis/mine.js';
import { getFitDetail } from '@/apis/index.js';
import { videoReport } from '@/apis/common.js';
export default {
	components: {
		SelectProject
	},
	onLoad(options) {
		this.activity_video_id = options.activity_video_id;
		this.video_type = options.video_type;
		this.getDetail();
	},
	data() {
		return {
			activity_video_id: '',
			video_type: '',
			info: {},
			show: false,
			list: [
				{
					value: '1',
					label: '广告营销'
				},
				{
					value: '2',
					label: '暴力色情低俗'
				},
				{
					value: '3',
					label: '存在欺骗行为'
				},
				{
					value: '4',
					label: '带有政治敏感信息'
				},
				{
					value: '5',
					label: '存在侵权行为'
				},
				{
					value: '6',
					label: '其他'
				}
			],
			des: '',
			type_str: '请选择举报类型',
			type: '',
			loading: false
		};
	},
	methods: {
		filterTime(time) {
			if (!time) {
				return '';
			}
			return formatTimeHM(time, '{h}:{i}');
		},
		changeType() {
			this.$refs.selectProject.open();
		},
		confirm(value) {
			this.$refs.selectProject.close();
		},
		cancel() {
			this.$refs.selectProject.close();
		},
		handleClick() {
			let url = `/pages/videoDetail/index?activity_video_id=${this.activity_video_id}`;
			if (this.video_type == 'fit') {
				url = `/pages/videoDetail/index?video_type=fit&activity_video_id=${this.activity_video_id}`;
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
				if (res.data['type_two']) {
					res.data.project_name = type_two_map[res.data.type_two];
				}
				this.info = res.data;
			}
		},
		handleChange(item) {
			this.type = item.value;
			this.type_str = item.label;
			this.cancel();
		},
		submit() {
			if (this.loading) {
				return;
			}
			if (!this.type) {
				this.$public.showToast('请选择举报类型');
				return;
			}
			if (!this.des) {
				this.$public.showToast('请填写举报内容');
				return;
			}
			let obj = {
				activity_video_id: this.info.activity_video_id,
				type: this.type,
				des: this.des
			};
			this.loading = true;
			videoReport(obj).then((res) => {
				if (res.code === 200) {
					uni.showToast({
						title: '提交成功',
						icon: 'success'
					});
					setTimeout(() => {
						uni.navigateBack();
						this.loading = false;
					}, 1000);
				} else {
					this.loading = false;
					this.$public.showToast(res.message);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.page-container {
	box-sizing: border-box;
	padding: 0 32rpx;
	min-height: 100vh;
	background-color: #fff;
}
.title {
	font-size: $pp-text-color;
	font-size: 32rpx;
	font-weight: 400;
	padding: 30rpx 0;
}
.video-container {
	padding: 24rpx;
	min-height: 216rpx;
	box-sizing: border-box;
	border-radius: 16rpx;
	background-color: #f2f3f5;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	.left {
		flex: 1;
		min-height: 168rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.name {
			font-size: 28rpx;
			color: $pp-text-color;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.tags {
			display: inline;
			width: fit-content;
			font-size: 24rpx;
			font-weight: 400;
			color: #408bff;
			padding: 0 8rpx;
			color: #408bff;
			border-radius: 4rpx;
			border: 1px solid #408bff;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.report_type {
			color: #f4443a;
			font-size: 28rpx;
			font-weight: 400;
		}
	}
}

.content {
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	border-radius: 16rpx;
	width: 300rpx;
	margin-left: 20rpx;
	overflow: hidden;
	background-color: #fff;
	.wrap {
		display: flex;
		flex-direction: column;
		padding: 24rpx;
		.title {
			font-size: 28rpx;
			font-weight: 500;
			margin-bottom: 18rpx;
		}
		.tag text {
			display: inline-block;
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
			object-fit: fill;
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
.submit-bth {
	margin: 56rpx auto 0;
	width: calc(100% - 32rpx);
	border-radius: 200rpx;
	color: #fff;
	font-size: 30rpx;
	text-align: center;
	padding: 20rpx 0;
	background: linear-gradient(138.27deg, #f94e47 0%, #f0392c 100%);
}

.feedback-edit {
	.remark {
		position: relative;
		margin: 72rpx 0;
		padding: 32rpx 32rpx 60rpx;
		background-color: #fafafc;
		border-radius: 24rpx;
		.textarea {
			min-height: 260rpx;
			width: 100%;
		}
		.remark-count {
			position: absolute;
			bottom: 24rpx;
			right: 32rpx;
			color: #b5b5b5;
			font-size: 24rpx;
		}
	}
	.fast-text {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: 32rpx;
		color: #f4443a;
		font-size: 24rpx;
		text {
			margin-left: 8rpx;
		}
	}
	.submit-bth {
		margin: 56rpx auto 0;
		width: calc(100% - 32rpx);
		border-radius: 200rpx;
		color: #fff;
		font-size: 30rpx;
		text-align: center;
		padding: 20rpx 0;
		background: linear-gradient(138.27deg, #f94e47 0%, #f0392c 100%);
	}
}

.select-project-container {
	background-color: #fff;
	border-radius: 50rpx 50rpx 0 0;
	.title-out-box {
		padding: 0 32rpx;
	}
	.title-box {
		text-align: center;
		padding: 40rpx 0;
		border-bottom: 1rpx solid #edeff2;
		.titles {
			font-size: 32rpx;
			font-weight: 400;
			color: $pp-text-color;
			margin-bottom: 16rpx;
		}
		.tip {
			font-size: 28rpx;
			color: #969799;
		}
	}
	.main-box {
		.cell {
			font-size: 32rpx;
			font-weight: 400;
			color: $pp-text-color;
			text-align: center;
			padding: 28rpx;
			box-sizing: border-box;
		}
	}
	.bottom-box {
		font-size: 32rpx;
		font-weight: 400;
		color: #646566;
		text-align: center;
		padding: 28rpx;
		box-sizing: border-box;
		border-top: 16rpx solid #f7f8fa;
	}
}
</style>
