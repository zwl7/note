<template>
	<view class="upload-video-container">
		<video id="myVideo" class="myVideo" v-show="isOpenVideo" :show-fullscreen-btn="false"
			:show-center-play-btn="false" :autoplay="false" :src="url" @fullscreenchange="bindfullscreenchange"></video>
		<!-- 上传完状态 -->
		<view v-if="have_image_url" class="video-cover">
			<image class="img" :src="image" mode="aspectFill"></image>
			<!-- 		<view class="clear" @click="clearVideo">
				<uni-icons custom-prefix="iconfont" class="iconfont" type="icon-clear" color="#fff" size="8"></uni-icons>
			</view> -->
			<view class="play" @click="playVedio">
				<uni-icons custom-prefix="iconfont" class="iconfont" type="icon-play" color="#fff"
					size="22"></uni-icons>
			</view>
			<view class="cover-edit" @click="editCover">修改封面</view>
		</view>
		<!-- 未上传状态 -->
		<view v-else class="video-cover active" @click="uploadVideo">
			<uni-icons custom-prefix="iconfont" type="icon-puls" color="#C8C9CC" size="20"></uni-icons>
		</view>
		<view class="progress-bar">
			<UploadProgressBar :percent="progress" />
		</view>
		<!-- 删除确认弹窗 -->
		<uni-popup ref="alertDialog" type="dialog" class="alert-dialog">
			<view class="dialog-container">
				<view class="title">是否删除视频</view>
				<view class="text">更换视频上传新的视频会累加之前视屏的点赞量和浏览量，提交后需要审核通过后才能展示，是否继续更换？</view>
				<view class="affirm">
					<view class="btn1" @click="dialogClear(1)">取消</view>
					<view class="btn2" @click="dialogClear(2)">继续更换</view>
				</view>
			</view>
		</uni-popup>
		<canvas canvas-id="myCanvas0" style="position: fixed; left: -10000px"></canvas>
	</view>
</template>

<script>
	import config from '@/core/config.js';
	import UploadProgressBar from './UploadProgressBar.vue';
	const HOST_IP = config.baseUrl;
	const VERIFY_URL = `${HOST_IP}/bigFile/check`;
	const UPLOAD_URL = `${HOST_IP}/bigFile/upload`;
	import Uploader from '@/utils/uploader.js';
	import HWUploader from '@/utils/hwUpload/VodClient.js';
	import {
		uploadImage,
		compressFile
	} from '@/utils/util.js';
	export default {
		name: 'UploaVideo',
		props: {},
		components: {
			UploadProgressBar
		},
		data() {
			return {
				progress: 0,
				uploadedSize: 0,
				averageSpeed: 0,
				timeRemaining: Number.POSITIVE_INFINITY,
				testChunks: true,
				image: '',
				url: '', //临时url
				upload_url: '', //上传后url
				time_len: 0,
				size: 0,
				videoRes: {},
				have_image_url: false, //是否有图片路径
				is_upload_image: false, //图片是否上传
				is_upload_video: false, //视频是否上传
				videoContext: '',
				isOpenVideo: false
			};
		},
		async created() {
			let app = getApp();
			let videoRes = app.globalData.currentChangeVideo;
			let {
				thumbTempFilePath,
				tempFilePath,
				duration,
				size
			} = videoRes;
			console.log('----------------------------videoRes-', videoRes);
			this.videoRes = videoRes;
			this.image = thumbTempFilePath;
			this.url = tempFilePath;
			this.time_len = duration;
			this.size = size;
			this.have_image_url = true;
			console.log('----------------临时图片路径', thumbTempFilePath);
			if (thumbTempFilePath) {
				let up_image_res = await uploadImage(thumbTempFilePath);
				console.log('----------------上传图片', up_image_res);
				if (up_image_res.code == 200) {
					this.image = up_image_res.data.imgUrl;
					this.is_upload_image = true;
				}
			}
			if (this.url) {
				this.chooseVideo();
			}
			this.videoContext = uni.createVideoContext('myVideo', this);
		},
		methods: {
			bindfullscreenchange(e) {
				if (!e.detail.fullScreen) {
					this.videoContext.stop();
					this.isOpenVideo = false;
				}
			},
			// 修改封面
			editCover() {
				let _this = this;
				uni.chooseMedia({
					count: 1,
					mediaType: ['image'],
					sizeType: ['original'],
					sourceType: ['album'],
					success: async (res) => {
						let tempFile = res.tempFiles[0];
						let tempFilePath = tempFile.tempFilePath;
						if (tempFile.size > 2 * 1024 * 1024) {
							tempFilePath = await compressFile.call(_this, tempFilePath, 0, tempFile.size);
						}
						uploadImage(tempFilePath).then((img_res) => {
							if (img_res.code == 200) {
								_this.image = img_res.data.imgUrl;
								_this.is_upload_image = true;
							} else {
								_this.$public.showToast(res.message);
							}
						});
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			// 删除视频
			clearVideo() {
				console.log('删除视频');
			},
			playVedio() {
				console.log('播放视频');
				this.isOpenVideo = true;
				this.videoContext = uni.createVideoContext('myVideo', this);
				this.videoContext.play();
				this.videoContext.requestFullScreen();
			},
			// 上传视频
			uploadVideo() {
				console.log('上传视频');
				this.chooseVideo();
			},
			// 弹窗开启
			dialogToggle() {
				this.$refs.alertDialog.open();
			},
			// 关闭弹窗 type 1 取消  2 继续
			dialogClear(type) {
				console.log(type == 1 ? '取消' : '继续');
				this.$refs.alertDialog.close();
			},
			async chooseVideo() {
				this.reset();
				if (!Uploader.isSupport()) {
					uni.showToast({
						title: '分片上传在 2.10.0 版本以上支持',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				let {
					tempFilePath,
					size
				} = this.videoRes;
				let fileName = new Date().getTime();
				// const uploader = new Uploader({
				const uploader = new HWUploader({
					tempFilePath,
					totalSize: size,
					fileName: String(fileName),
					verifyUrl: VERIFY_URL,
					uploadUrl: UPLOAD_URL,
					testChunks: this.testChunks,
					verbose: true
				});
				uploader.on('retry', (res) => {
					console.log('retry', res.url);
				});

				uploader.on('complete', (res) => {
					console.log('upload complete', res);
				});

				uploader.on('success', (res) => {
					console.log('upload success', res);
					this.upload_url = res.url;
					this.is_upload_video = true;
				});

				uploader.on('fail', (res) => {
					console.log('upload fail', res);
					this.$public.showToast(res.errMsg);
				});

				uploader.on('progress', (res) => {
					console.log('-----------------------------progress', res);
					this.progress = res.progress;
					this.uploadedSize = parseInt(res.uploadedSize / 1024);
					this.averageSpeed = parseInt(res.averageSpeed / 1024);
					this.timeRemaining = res.timeRemaining;
				});
				uploader.upload();

				this.uploader = uploader;
			},
			getData() {
				let obj = {
					size: this.size,
					time_len: this.time_len,
					url: this.upload_url,
					image: this.image,
					process: this.progress,
					is_upload_video: this.is_upload_video,
					is_upload_image: this.is_upload_image
				};
				return obj;
			},
			reset() {
				this.progress = 0;
				this.uploadedSize = 0;
				this.averageSpeed = 0;
				this.timeRemaining = Number.POSITIVE_INFINITY;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.myVideo {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}

	.upload-video-container {
		.progress-bar {
			width: 212rpx;
			height: 4rpx;
			margin-top: 24rpx;
		}

		.video-cover {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 212rpx;
			height: 212rpx;
			border-radius: 8rpx;
			margin-right: 24rpx;
			background-color: #f7f8fa;

			.img {
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				z-index: 2;
				width: 212rpx;
				height: 212rpx;
				border-radius: 8rpx;
				z-index: 2;
			}

			.clear {
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				top: 0;
				right: 0;
				width: 40rpx;
				line-height: 2rpx;
				height: 40rpx;
				background-color: rgba(0, 0, 0, 0.6);
				color: #fff;
				z-index: 3;
				border-radius: 0 8rpx 0 24rpx;

				.iconfont {
					width: 14rpx;
					height: 14rpx;
				}
			}

			.play {
				position: absolute;
				z-index: 100;

				.iconfont {
					width: 44rpx;
					height: 44rpx;
				}
			}

			.cover-edit {
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				height: 50rpx;
				line-height: 50rpx;
				background-color: rgba(0, 0, 0, 0.6);
				color: #fff;
				text-align: center;
				font-size: 24rpx;
				z-index: 3;
			}
		}
	}

	.upload-footer {
		position: fixed;
		bottom: 15rpx;
		left: 50%;
		transform: translateX(-50%);
		width: calc(100vw - 32rpx);
		border-radius: 100px;
		text-align: center;
		color: #fff;
		font-size: 28rpx;
		padding: 22rpx 0;
		background: linear-gradient(138.27deg, #f94e47 0%, #f0392c 100%);
	}

	.dialog-container {
		position: fixed;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);
		background-color: #fff;
		border-radius: 32rpx;
		padding: 64rpx 48rpx 32rpx;
		width: calc(100vw - 64rpx);
		font-size: 28rpx;
		color: #323233;

		.title {
			font-size: 32rpx;
			font-weight: 500;
			text-align: center;
			padding-bottom: 16rpx;
		}

		.affirm {
			display: flex;
			margin-top: 88rpx;
			text-align: center;
			justify-content: center;
			align-items: center;

			view {
				border-radius: 100rpx;
				padding: 18rpx;
				flex: 1;
			}

			.btn1 {
				color: #323233;
				border: 1px solid #dcdee0;
			}

			.btn2 {
				background: linear-gradient(138.27deg, #f94e47 0%, #f0392c 100%);
				color: #fff;
				margin-left: 30rpx;
			}
		}
	}
</style>