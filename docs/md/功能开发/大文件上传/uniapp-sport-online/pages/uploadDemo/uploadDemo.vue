<template>
	<view>
		<view class="line">
			<button @click="chooseVideo">选择视频</button>
		</view>
		<view class="line">
			<button @click="handlePause">暂停上传</button>
		</view>
		<view class="line">
			<button @click="handleResume">恢复上传</button>
		</view>
		<view class="line">
			<button @click="handleCancel">取消上传</button>
		</view>
		<view class="line">
			<button @click="handleUpload">重新上传</button>
		</view>
		<view class="line">
			<button @click="handleEdit">視頻編輯</button>
		</view>
		<view class="line">
			是否计算文件 MD5
			<switch :checked="testChunks" @change="onTestChunksChange"></switch>
		</view>
		<view class="line">
			分片大小（MB）
			<slider class="slider" min="1" max="10" step="1" value="5" show-value @change="onChunkSizeChange"></slider>
		</view>
		<view class="line">
			上传进度：
			<progress :percent="progress" show-info border-radius="5" duration="20" active-mode="forwards" active></progress>
		</view>

		<view class="line">已上传大小： {{ uploadedSize }} kB</view>
		<view class="line">平均速度：{{ averageSpeed }} kB/s</view>
		<view class="line">预计剩余时间： {{ timeRemaining }} ms</view>
	</view>
</template>

<script>
// 使用测试机的IP地址，在工具设置中忽略域名校验
const HOST_IP = '192.168.1.76';
const MERGE_URL = `http://${HOST_IP}:8100/merge`;
const VERIFY_URL = `http://${HOST_IP}:8100/bigFile/check`;
const UPLOAD_URL = `http://${HOST_IP}:8100/bigFile/upload`;
import Uploader from '@/utils/uploader.js';

export default {
	data() {
		return {
			progress: 0,
			uploadedSize: 0,
			averageSpeed: 0,
			timeRemaining: Number.POSITIVE_INFINITY,
			testChunks: true
		};
	},
	methods: {
		handleClick() {
			uni.chooseMedia({
				count: 1,
				mediaType: ['video'],
				sourceType: ['album', 'camera'],
				maxDuration: 60,
				camera: 'back',
				success(res) {
					let fileInfo = res.tempFiles[0];
					console.log(fileInfo);
					let { size, tempFilePath, thumbTempFilePath, duration, fileType } = fileInfo;
					let FileSystemManager = uni.getFileSystemManager();
					FileSystemManager.readFile({
						filePath: tempFilePath,
						complete(res) {
							console.log(res);
						}
					});
				},
				fail(err) {
					console.log(err);
				}
			});
		},
		async chooseVideo() {
			this.reset();
			const { tempFilePath, size } = await uni.chooseVideo({
				sourceType: ['album'],
				compressed: false
			});

			if (!Uploader.isSupport()) {
				uni.showToast({
					title: '分片上传在 2.10.0 版本以上支持',
					icon: 'none',
					duration: 3000
				});
				return;
			}
			const uploader = new Uploader({
				tempFilePath,
				totalSize: size,
				fileName: 'demo',
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
			});

			uploader.on('fail', (res) => {
				console.log('upload fail', res);
			});

			uploader.on('progress', (res) => {
				this.progress = res.progress;
				this.uploadedSize = parseInt(res.uploadedSize / 1024);
				this.averageSpeed = parseInt(res.averageSpeed / 1024);
				this.timeRemaining = res.timeRemaining;
			});

			uploader.upload();

			this.uploader = uploader;
		},

		reset() {
			this.progress = 0;
			this.uploadedSize = 0;
			this.averageSpeed = 0;
			this.timeRemaining = Number.POSITIVE_INFINITY;
		},

		handleUpload() {
			this.uploader && this.uploader.upload();
		},

		handlePause() {
			this.uploader && this.uploader.pause();
		},

		handleResume() {
			this.uploader && this.uploader.resume();
		},

		handleCancel() {
			this.uploader && this.uploader.cancel();
		},
		async handleEdit() {
			const { tempFilePath, size } = await uni.chooseVideo({
				sourceType: ['album'],
				compressed: false
			});
			console.log(tempFilePath);
			uni.openVideoEditor({
				filePath: tempFilePath,
				minDuration: '1000',
				maxDuration: '5000',
				success(res) {
					console.log(res);
				},
				complete(e) {
					console.log(e);
				}
			});
		}
	}
};
</script>

<style lang="scss">
.intro {
	margin: 30px;
	text-align: center;
}

.line {
	margin: 10px;
}

slider {
	margin: 0;
}
</style>
