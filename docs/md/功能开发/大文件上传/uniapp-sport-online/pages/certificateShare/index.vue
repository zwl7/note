<template>
	<view class="certificate-share-container">
		<NavBar nav-color="transparent" show-back />
		<view class="centent">
			<image :src="currentWatchDiPloma"></image>
			<view class="footer-btn">
				<button @click="handleShare">分享</button>
				<button @click="handleSave">保存图片</button>
			</view>
		</view>
	</view>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { saveNetImageToAlbum } from '@/utils/util.js';
export default {
	components: { NavBar },
	data() {
		return {
			currentWatchDiPloma: '',
			loading: false
		};
	},
	onLoad() {
		this.currentWatchDiPloma = getApp().globalData.currentWatchDiPloma;
	},
	methods: {
		handleSave() {
			if (this.loading) {
				return;
			}
			this.loading = true;
			saveNetImageToAlbum(this.currentWatchDiPloma).then((res) => {
				this.loading = false;
			});
		},
		handleShare() {
			let _this = this;
			uni.showLoading({
				title: '加载中'
			});
			uni.downloadFile({
				url: _this.currentWatchDiPloma,
				success(res) {
					console.log(res);
					if (res.statusCode === 200) {
						uni.showShareImageMenu({
							path: res.tempFilePath,
							success(res) {
								uni.hideLoading();
							},
							fail(err) {
								uni.hideLoading();
							}
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: '下载失败'
						});
					}
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
	image {
		height: 950rpx;
		width: calc(100vw - 80rpx);
	}
	.centent {
		position: absolute;
		top: 12vh;
		left: 50%;
		transform: translateX(-50%);
	}
	.footer-btn {
		display: flex;
		justify-content: space-between;
		margin-top: 60rpx;
		button {
			flex: 1;
			border-radius: 200rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 28rpx;
			color: #323233;
			&:last-child {
				margin-left: 30rpx;
				color: #fff;
				background-color: #f6483f;
			}
		}
	}
}
</style>
