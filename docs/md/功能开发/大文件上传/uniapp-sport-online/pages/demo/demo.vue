<template>
	<view>
		<button @click="handleClick">上传</button>
	</view>
</template>

<script>
import { changeVideo } from '@/utils/util.js';
import { hWSecurityTokens, hWVodCreateAsset, hWConfirmAssetUpload } from '@/apis/upload.js';
export default {
	name: 'open-media',

	data() {
		return {
			isOpenVideo: false,
			videoContext: null,
			stoken: {},
			fileInfo: {}
		};
	},
	methods: {
		async handleClick() {
			console.log('--------点击上传');
			let res = await changeVideo();
			console.log(res);
			this.fileInfo = res;
			this.Stoken = await this.gethWSecurityTokens();
			console.log('----第一步', this.Stoken);
			this.createAsset();
		},
		// 第一步   获取token
		async gethWSecurityTokens() {
			const res = await hWSecurityTokens({});
			if (res) {
				return res.data.credential;
			}
		},
		// 第二步 创建媒资
		async createAsset() {
			let infoList = this.fileInfo.tempFilePath.split('/');
			let info = infoList[infoList.length - 1];
			console.log(info);
			const res = await hWVodCreateAsset({
				title: info.split('.')[0],
				video_name: info.split('.')[0],
				video_type: info.split('.')[1].toUpperCase()
			});
			console.log('----第二步', res);
			let video_upload_url = res.data.video_upload_url;
			let asset_id = res.data.asset_id;
			this.video_upload_url = video_upload_url;
			this.asset_id = asset_id;
			console.log('----第三步');
			this.putFile();
		},
		// 第三部 上传文件
		putFile() {
			var wxfs = wx.getFileSystemManager();
			let _this = this;
			wxfs.readFile({
				filePath: _this.fileInfo.tempFilePath,
				success: function (fileRes) {
					var requestTask = wx.request({
						url: _this.video_upload_url,
						method: 'PUT',
						header: {
							'content-type': 'video/mp4'
						},
						data: fileRes.data,
						success: function success(res) {
							if (res.statusCode === 200) {
								_this.confirmAssetUpload();
							} else {
							}
						},
						fail: function fail(res) {
							wx.showModal({ title: '上传失败', content: JSON.stringify(res), showCancel: false });
						}
					});
					requestTask.onProgressUpdate(function (res) {
						console.log('正在进度:', res);
					});
				}
			});
		},
		//  第三部确认媒资
		async confirmAssetUpload() {
			let res = await hWConfirmAssetUpload({ asset_id: this.asset_id });
			console.log(res);
			console.log('----第四步');
		}
	}
};
</script>

<style lang="scss"></style>
