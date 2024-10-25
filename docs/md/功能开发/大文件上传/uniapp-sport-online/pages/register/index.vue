<template>
	<view class="mine-container">
		<view class="header-box">
			<image src="../../../static/imgs/mine-header.png" class="box1" mode=""></image>
			<NavBar :nav-color="primaryColor" show-back></NavBar>
		</view>
		<view class="login-form">
			<button class="avatar_box" @click="showChangeImageSheet">
				<image :src="avatar" mode="aspectFill" class="avatar"></image>
				<view class="icon_box">
					<uni-icons type="camera-filled" size="16" color="#fff"></uni-icons>
				</view>
			</button>
			<view class="button nick_input_button">
				<input
					@input="onNicknameChange"
					@blur="onNickName"
					maxlength="10"
					v-model="nick_name"
					class="nick_input"
					placeholder="请输入昵称"
					placeholderClass="placeholderClass"
					type="nickname"
				/>
			</view>
			<view class="button button1" @click="handleSave">
				<text class="title">立即参与线上运动会</text>
			</view>
		</view>
		<canvas id="myCanvas0" style="position: fixed; left: -10000px"></canvas>
	</view>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Empty from '@/components/Empty.vue';
import { miniAuthLogin } from '@/apis/login.js';
import { uploadImage, compressFile } from '@/utils/util.js';
export default {
	components: {
		NavBar
	},
	data() {
		return {
			primaryColor: 'transparent',
			isAuth: false,
			checked: false,
			loading: false,
			avatar: 'https://cdn-static.papa.com.cn/shandong/avatar.png',
			nick_name: '',
			code: '',
			token: ''
		};
	},
	async onLoad(options) {
		this.code = options.code;
	},
	async onShow() {},
	methods: {
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
				sizeType: ['compressed'],
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
		handleSave() {
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
		},
		async fnRequest() {
			let userInfo = {
				nick_name: String(this.nick_name).trim(),
				code: this.code,
				token: getApp().globalData.token,
				avatar: this.avatar
			};
			let app = getApp();
			let res = await miniAuthLogin(userInfo);
			if (res.code === 200) {
				app.globalData.userInfo.avatar_url = res.data.avatar_url;
				app.globalData.userInfo.name = res.data.name;
				app.globalData.userInfo.nick_name = res.data.nick_name;
				app.globalData.userInfo.is_auth = res.data.is_authenticate;
				app.globalData.isAuth = res.data.is_authenticate === -1 ? false : true;
				this.loading = false;
				uni.reLaunch({
					url: '/pages/tabbar/home/index'
				});
			} else {
				this.$public.showToast(res.message);
			}
			this.loading = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.mine-container {
	min-height: 100vh;
	box-sizing: border-box;
	background-color: #f7f8fa;
}
.header-box {
	width: 100%;
	height: 40vh;
	background: linear-gradient(180deg, #ff6f6b 0%, #fff9f9 100%);
	position: relative;
	overflow: hidden;

	.header-box-main {
		position: relative;
		z-index: 10;
		height: 100%;
	}

	.box1 {
		position: absolute;
		left: 40rpx;
		top: -224rpx;
		display: block;
		width: 882rpx;
		height: 596rpx;
		z-index: 0;
	}
}

.login-form {
	width: 100%;
	box-sizing: border-box;
	padding: 0 76rpx;
	position: fixed;
	bottom: 308rpx;
}
.avatar-box {
	display: block;
	width: 98rpx;
	height: 98rpx;
	background-color: pink;
	margin: 0 auto 64rpx;
}

.nick_input {
	width: 100%;
	height: 100%;
	background-color: #fff;
	border-radius: 88rpx;
	padding: 0 48rpx;
	border: 1rpx solid #ebedf0;
}
.nick_input_button {
	margin-bottom: 56rpx !important;
}
.button {
	width: 100%;
	height: 88rpx;
	border-radius: 88rpx;
	margin-bottom: 24rpx;
	background-color: #f5f5f5;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	color: #333333;
	border: none;
}

.button1 {
	background-color: #e32416;
	color: #fff;
}

.title {
	margin-left: 20rpx;
}
.proposal {
	display: flex;
	align-items: flex-end;
}

.info {
	font-size: 24rpx;
	color: #999999;
	transform: translateY(-10rpx);
}

.color-orange {
	color: #e32416;
}

.avatar_box {
	width: 168rpx;
	height: 168rpx;
	box-sizing: border-box;
	border: none !important;
	border-radius: 84rpx;
	z-index: 11;
	padding: 0;
	position: relative;
	overflow: visible;
	margin: 0 auto 80rpx;

	.avatar_box::after {
		border: none !important;
	}

	.avatar {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2rpx solid #fff;
		box-sizing: border-box;
	}

	.icon_box {
		position: absolute;
		right: 0rpx;
		bottom: 10rpx;
		width: 48rpx;
		height: 48rpx;
		z-index: 1200;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

.avatar_box::after {
	border: none !important;
}
</style>
