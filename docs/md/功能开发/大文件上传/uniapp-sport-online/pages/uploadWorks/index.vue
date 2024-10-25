<template>
	<view class="upload-works-container">
		<view class="common-line active">
			<input type="text" v-model="name" class="input" placeholder="请填写作品名称" placeholder-class="placeholder-class" />
		</view>
		<view class="common-line">
			<textarea v-model="des" class="textarea" placeholder="添加作品描述" auto placeholder-class="placeholder-class" />
		</view>
		<UploaVideo ref="uploadVideo" />
		<view class="project-container">
			<view class="left">
				<image src="http://api.linksports.com.cn:8180/images/55/20230828/c514225733e189d666c23e78fe5eff3e.png" mode=""></image>
				<view class="project-name">{{ eventInfo.project_name }}</view>
			</view>
			<!-- 						<uni-icons class="right" type="right" color="#B5B5B5" @click="handel" size="18"></uni-icons> -->
		</view>
		<!-- 选择项目 -->
		<uni-popup ref="selectProject" type="bottom">
			<view class="select-project-container">
				<SelectProject :list="list" mode="single-column" v-model="show" :value="show" title="选择项目" @cancel="cancel" @confirm="confirm" />
			</view>
		</uni-popup>
		<BottomButton @submit="submit" title="上传作品" />
	</view>
</template>

<script>
import UploaVideo from './components/UploadVideo.vue';
import BottomButton from '@/components/BottomButton.vue';
import SelectProject from '@/components/Select/index.vue';
import { uploadActivityVideo, getActivityVideoDetail, updateActivityVideo, getMyMatchActivity } from '@/apis/mine.js';
export default {
	components: {
		UploaVideo,
		BottomButton,
		SelectProject
	},
	data() {
		return {
			show: false,
			list: [
				{
					value: '1',
					label: '篮球比赛'
				},
				{
					value: '2',
					label: '足球比赛'
				}
			],
			name: '',
			images: '',
			url: '',
			des: '',
			size: '',
			time_len: '',
			match_activity_id: '',
			activity_video_id: '',
			eventInfo: {},
			loading: false,
			handleType: 'add'
		};
	},
	async onLoad(options) {
		let { match_activity_id, type, activity_video_id } = options;
		this.match_activity_id = match_activity_id;
		this.activity_video_id = activity_video_id;
		this.type = type;
		if (type == 'add') {
			this.getMyEvent();
		} else if (type == 'edit') {
			this.getVideoDetail();
		}
	},
	methods: {
		// 我的赛事
		async getMyEvent() {
			let res = await getMyMatchActivity({ match_activity_id: this.match_activity_id });
			if (res.code === 200) {
				this.eventInfo = res.data[0];
			}
		},
		submit() {
			if (this.loading) {
				return;
			}
			if (!this.name) {
				this.$public.showToast('请填写作品名称');
				return;
			}
			if (!this.des) {
				this.$public.showToast('请填写作品描述');
				return;
			}
			let $uploadVideo = this.$refs['uploadVideo'];
			let data = $uploadVideo.getData();
			console.log('---------------data', data);
			if (!data.is_upload_video) {
				this.$public.showToast('视频正在上传，请稍后');
				return;
			}
			if (!data.is_upload_image) {
				this.$public.showToast('请先上传封面');
				return;
			}
			this.url = data.url;
			this.images = data.image;
			this.size = data.size;
			this.time_len = data.time_len;
			this.handleAddActivityVideo(data);
		},
		async handleAddActivityVideo() {
			this.loading = true;
			let obj = {
				name: this.name,
				images: this.images,
				url: this.url,
				des: this.des,
				size: this.size,
				time_len: this.time_len,
				match_activity_id: this.match_activity_id
			};
			let fn = uploadActivityVideo;
			if (this.type == 'edit') {
				fn = updateActivityVideo;
				obj.activity_video_id = this.activity_video_id;
			}
			let res = await fn(obj);
			this.loading = false;
			if (res.code == 200) {
				uni.showToast({
					icon: 'success',
					title: '发布成功'
				});
				getApp().globalData.mineRefresh = true;
				setTimeout(() => {
					uni.redirectTo({
						url: `/pages/joinEventsDetail/index?match_activity_id=${this.match_activity_id}`
					});
				}, 2000);
			} else {
				this.$public.showToast(res.message);
			}
		},
		// 获取视频信息
		async getVideoDetail() {
			let res = await getActivityVideoDetail({ activity_video_id: this.activity_video_id, type: 2 });
			if (res.code == 200) {
				this.name = res.data.name;
				this.des = res.data.des;
				this.project_name = res.data.project_name;
				this.eventInfo.project_name = res.data.project_name;
			}
		},
		confirm(value) {
			this.$refs.selectProject.close();
			this.show = false;
		},
		cancel() {
			this.$refs.selectProject.close();
			this.show = false;
		},
		handel() {
			this.$refs.selectProject.open();
			this.show = true;
		}
	}
};
</script>

<style lang="scss">
.upload-works-container {
	padding: 0 32rpx;
	min-height: 100vh;
	background-color: #fff;
	.common-line {
		padding: 32rpx 0;
		&.active {
			border-bottom: 1px solid #ebedf0;
		}
		.input::-webkit-input-placeholder {
			color: red !important;
		}
		.textarea {
			width: 100%;
			min-height: 300rpx;
		}
	}
	.placeholder-class {
		color: #c8c9cc !important;
	}
	.project-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 54rpx;
		.left {
			display: flex;
			align-items: center;
			image {
				width: 48rpx;
				height: 48rpx;
				margin-right: 32rpx;
			}
		}
		.right {
			width: 36rpx;
			height: 36rpx;
		}
	}
}
.select-project-container {
	border-radius: 24rpx 24rpx 0 0;
	background-color: #fff;
}
</style>
