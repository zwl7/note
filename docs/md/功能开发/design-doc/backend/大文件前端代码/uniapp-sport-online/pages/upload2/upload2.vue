<template>
	<view>
		<button @click="handleClick">上传</button>
	</view>
</template>

<script>
import { changeVideo } from '@/utils/util.js';
import { hWSecurityTokens, hWVodCreateAsset, hWConfirmAssetUpload } from '@/apis/upload.js';
import VodClient from '@/utils/hwUpload/VodClient.js';
export default {
	name: 'open-media',

	data() {
		return {
			isOpenVideo: false,
			videoContext: null,
			stoken: {},
			fileInfo: {},
			project_id: '09cb3c544e8010582fc1c006957ef9cf' //华为云项目id
		};
	},
	methods: {
		async handleClick() {
			console.log('--------点击上传');
			let res = await changeVideo();
			this.fileInfo = res;
			let fileName = new Date().getTime();
			let uploader = new VodClient({
				tempFilePath: res.tempFilePath,
				totalSize: res.size,
				fileName: String(fileName)
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
			});

			uploader.upload();

			// // vodClident.resolveXML2();
			// await vodClident.gethWSecurityTokens();
			// await vodClident.createAsset();
			// await vodClident.initializationUpload();
			// await vodClident.InitializationUploadPart();
			// let res_ = await vodClident.uploadChunk();
			// console.log(res_);
			// let res_3 = await vodClident.GetUploadPart();
			// res_3 = await vodClident.isComplete();
			// vodClident.isConfirm();
		}
	}
};
</script>

<style lang="scss"></style>
