<template>
	<view class="certificate-container">
		<PrivacyPopup></PrivacyPopup>
		<view class="common-line">
			<view class="c-title">头像</view>
			<view class="avatar-box" @click="showChangeImageSheet">
				<image :src="avatar" mode="aspectFill" class="avatar"></image>
				<uni-icons type="right" size="16" color="#969799"></uni-icons>
			</view>
		</view>
		<view class="common-line">
			<view class="c-title">昵称</view>
			<input
				@input="onNicknameChange"
				@blur="onNickName"
				maxlength="10"
				v-model="nick_name"
				type="nickname"
				placeholder-style="color:#B0B1B2;font-size:28rpx;text-align:right"
				placeholder="请输入昵称"
			/>
		</view>
		<view class="submit" @click="handleSave">确定</view>
		<canvas canvas-id="myCanvas0" style="position: fixed; left: -10000px"></canvas>
	</view>
</template>

<script>
import { miniAuthLogin, getUserInfo, updateUserInfo } from '@/apis/login.js';
import { uploadImage, buttonClicked, compressFile } from '@/utils/util.js';
import PrivacyPopup from '@/components/PrivacyPopup.vue';
export default {
	components: {
		PrivacyPopup
	},
	data() {
		return {
			avatar: 'https://cdn-static.papa.com.cn/shandong/avatar.png',
			nick_name: '',
			loading: false
		};
	},
	onLoad(options) {
		this.getUserInfo();
	},
	methods: {
		onNicknameChange(e) {
			let value = e.detail.value;
			if (value.length >= 10) {
				value = value.substr(0, 10);
				uni.showToast({
					title: `昵称不得超过10个字符`,
					icon: 'none'
				});
			}
			this.nick_name = value;
		},
		onNickName(e) {
			this.nick_name = e.detail.value;
		},
		showChangeImageSheet() {
			let _this = this;
			uni.showActionSheet({
				itemList: ['拍照', '从相册选择'],
				success: function (res) {
					let { tapIndex } = res;
					let types = {
						1: 'album',
						0: 'camera'
					};
					_this.changeImage(types[tapIndex]);
				},
				fail: function (res) {
					console.log(res.errMsg);
				}
			});
		},
		changeImage(type) {
			let _this = this;
			uni.chooseMedia({
				count: 1,
				mediaType: ['image'],
				sizeType: ['original'],
				sourceType: [type],
				success: async (res) => {
					let tempFile = res.tempFiles[0];
					let tempFilePath = tempFile.tempFilePath;
					if (tempFile.size > 2 * 1024 * 1024) {
						tempFilePath = await compressFile.call(_this, tempFilePath, 0, tempFile.size);
					}
					uploadImage(tempFilePath).then((img_res) => {
						if (img_res.code == 200) {
							_this.avatar = img_res.data.imgUrl;
						}
					});
				},
				fail: (err) => {
					console.log(err);
				}
			});
		},
		handleSave: buttonClicked(function () {
			if (this.loading) {
				this.$public.showToast('请勿重复点击提交');
				return;
			}
			if (!this.nick_name) {
				this.$public.showToast('请设置你的昵称');
				this.loading = false;
				return;
			}
			this.loading = true;
			this.fnRequest();
		}, 1000),

		async fnRequest() {
			let userInfo = {
				nick_name: String(this.nick_name).trim(),
				avatar: this.avatar
			};
			let app = getApp();
			let res = await updateUserInfo(userInfo);
			if (res.code === 200) {
				app.globalData.mineRefresh = true;
				app.setUserInfo(res.data);
				uni.showToast({
					title: '提交成功'
				});
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 1500);
			} else {
				this.$public.showToast(res.message);
				this.loading = false;
			}
		},
		getUserInfo() {
			getUserInfo({}).then((res) => {
				if (res.code === 200) {
					this.avatar = res.data.avatar;
					this.nick_name = res.data.nick_name;
				} else {
					this.$public.showToast(res.message);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.certificate-container {
	min-height: 100vh;
	background-color: #fff;
	font-size: 28rpx;
	padding: 0 32rpx;
	.common-line {
		border-bottom: 1rpx solid #f2f3f5;
		display: flex;
		align-items: center;
		width: 100%;
		height: 112rpx;
		padding: 0 40rpx;
		margin: 0 auto;
		&.no-border {
			border: none;
		}
		.c-title {
			width: 170rpx;
		}
		input {
			margin-left: 32rpx;
			flex: 1;
			text-align: right;
		}
		.avatar-box {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.avatar {
				display: block;
				width: 72rpx;
				height: 72rpx;
				border-radius: 72rpx;
				overflow: hidden;
				margin-right: 18rpx;
			}
		}
	}
	.submit {
		width: calc(100% - 32rpx);
		color: #fff;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 200rpx;
		text-align: center;
		margin: 72rpx auto 50rpx;
		background: linear-gradient(138.27deg, #f94e47 0%, #f0392c 100%);
	}
}
</style>
