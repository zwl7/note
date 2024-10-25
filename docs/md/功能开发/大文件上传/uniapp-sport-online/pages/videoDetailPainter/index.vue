<template>
	<view class="certificate-share-container">
		<NavBar nav-color="transparent" show-back />
		<view class="centent">
			<painter :palette="paintPallette" :scaleRatio="2" @imgOK="onImgOK" />
			<image :src="imageSrc" class="images"></image>
			<view class="footer-btn">
				<button class="button" @click="saveImage">保存图片</button>
			</view>
		</view>
	</view>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Card from './videoPoster.js';
import { getMPCode } from '@/apis/common.js';
import { saveImageToAlbum, buttonClicked } from '@/utils/util.js';
export default {
	components: { NavBar },
	data() {
		return {
			imageSrc: '',
			paintPallette: {},
			shareVideoInfo: {},
			isSave: false,
			loading: true
		};
	},
	onLoad() {
		uni.showLoading({
			title: '正在加载中'
		});
		let shareVideoInfo = getApp().globalData.shareVideoInfo;
		shareVideoInfo.welcometTips = `我正在参加线上${shareVideoInfo.match_name}， 这是我的参赛作品`;
		this.shareVideoInfo = shareVideoInfo;
		this.getMPCode();
	},
	methods: {
		onImgOK(e) {
			uni.hideLoading();
			this.loading = false;
			this.imageSrc = e.detail.path;
		},
		saveImage: buttonClicked(function () {
			if (this.imageSrc && typeof this.imageSrc === 'string') {
				this.isSave = false;
				saveImageToAlbum(this.imageSrc);
			}
		}),
		getMPCode() {
			let { shareVideoInfo } = this;
			let scene = `id=${shareVideoInfo.activity_video_id}&vt=${shareVideoInfo.video_type}`;
			let obj = {
				page: 'pages/videoDetail/index',
				scene: scene,
				env_version: getApp().globalData.env
			};
			getMPCode(obj).then((res) => {
				if (res.code === 200) {
					let url = 'data:image/jpeg;base64,' + res.data.images;
					this.shareVideoInfo.qrcode = url;
					this.paintPallette = new Card(this.shareVideoInfo).palette();
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.certificate-share-container {
	position: relative;
	min-height: 100vh;
	background-color: rgba(0, 0, 0, 0.7);
	.centent {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	.footer-btn {
		display: flex;
		justify-content: center;
		margin-top: 60rpx;
		.button {
			width: 394rpx;
			border-radius: 200rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 28rpx;
			color: #fff;
			background-color: #f6483f;
		}
	}
}
.images {
	display: block;
	width: 670rpx;
	height: 1044rpx;
}
</style>
