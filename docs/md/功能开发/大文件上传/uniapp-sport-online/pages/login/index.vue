<template>
	<view class="mine-container">
		<view class="header-box">
			<NavBar :nav-color="primaryColor" showBack></NavBar>
			<image src="../../../static/imgs/mine-header.png" class="box1" mode=""></image>
		</view>
		<view class="logo_box">
			<image src="https://cdn-static.papa.com.cn/sport_online/logo.png" class="image" mode=""></image>
		</view>
		<view class="login-form">
			<button
				v-if="checked"
				class="button button1"
				open-type="getPhoneNumber|agreePrivacyAuthorization"
				type="primary"
				@agreeprivacyauthorization="handleAgreePrivacyAuthorization"
				@getphonenumber="getphonenumber"
			>
				<text class="title">手机号授权登录</text>
			</button>
			<view v-if="!checked" class="button button1" @click="handleClickAgree">
				<text class="title">手机号授权登录</text>
			</view>

			<view class="button" @click="toWalk">先逛一逛</view>
			<view class="proposal">
				<checkbox-group @change="checkboxChange">
					<checkbox value="cb" :checked="checked" class="round red" style="transform: scale(0.7)" />
				</checkbox-group>
				<view class="info">
					我已同意全民健身线上赛的
					<text class="color-orange" @click="toAgreement(1)">服务协议</text>
					及
					<text class="color-orange" @click="toAgreement(2)">保密隐私协议</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Empty from '@/components/Empty.vue';
export default {
	components: {
		NavBar
	},
	data() {
		return {
			primaryColor: 'transparent',
			isAuth: false,
			checked: false,
			companyInfo: {
				name: '啪啪运动'
			},
			serviceData: {
				title: '保密隐私协议',
				content: ''
			},
			secretData: {
				title: '服务协议',
				content: ''
			},
			userInfo: {
				nick_name: '',
				avatar: '',
				sex: '',
				address: '',
				code: '',
				token: ''
			},
			popup_title: '',
			popup_content: ''
		};
	},
	async onLoad() {},
	async onShow() {
		// let is_auth = await this.judgeisAuth()
		// if (is_auth != -1) {
		// 	uni.switchTab({
		// 		url: '/pages/tabbar/home/index'
		// 	})
		// }
		// this.isAuth = is_auth === -1 ? false : true
	},
	methods: {
		getphonenumber(e) {
			if (e.detail && e.detail.errMsg == 'getPhoneNumber:ok') {
				let code = e.detail.code;
				let url = '/pages/register/index';
				url = url.concat('?need_auth=', 1).concat('&code=', code);
				console.log(url);
				uni.redirectTo({
					url: url
				});
			} else {
				this.showToast('获取手机号失败');
				return;
			}
		},
		handleAgreePrivacyAuthorization() {},
		handleClickAgree() {
			if (!this.checked) {
				uni.showToast({
					title: '请先阅读用户协议与隐私条款',
					icon: 'none'
				});
			}
		},
		judgeisAuth() {
			return new Promise((resolve) => {
				let app = getApp();
				if (app.globalData.is_login) {
					resolve(app.globalData.userInfo.is_auth);
				} else {
					let time = setInterval(() => {
						if (app.globalData.is_login) {
							resolve(app.globalData.userInfo.is_auth);
							clearInterval(time);
						}
					}, 50);
				}
			});
		},
		async checkboxChange(e) {
			if (e.detail.value.length > 0) {
				this.checked = true;
			} else {
				this.checked = false;
			}
		},
		toAgreement(type) {
			if (type == 1) {
				uni.navigateTo({
					url: '/pages/serviceAgreement/index'
				});
			}

			if (type == 2) {
				uni.navigateTo({
					url: '/pages/privacyAgreement/index'
				});
			}
		},
		toWalk() {
			uni.switchTab({
				url: '/pages/tabbar/home/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.mine-container {
	min-height: 100vh;
	box-sizing: border-box;
	background-color: #f7f8fa;
	// background: linear-gradient(180deg, #ff6f6b 0%, #fff9f9 100%);
}
.header-box {
	width: 100%;
	height: 424rpx;
	border-radius: 0 0 0 92rpx;
	background: linear-gradient(138.23deg, rgba(249, 78, 71, 1) 0%, rgba(240, 57, 44, 1) 100%);
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
		bottom: 40rpx;
		display: block;
		width: 882rpx;
		height: 596rpx;
		z-index: 0;
	}
}
.logo_box {
	display: block;
	width: 196rpx;
	height: 196rpx;
	border-radius: 196rpx;
	background-color: #fff;
	margin: 0 auto;
	transform: translateY(-50%);
	overflow: hidden;
	.image {
		display: block;
		width: 100%;
		height: 100%;
	}
}

.login-form {
	width: 100%;
	box-sizing: border-box;
	padding: 0 76rpx;
	position: fixed;
	bottom: 308rpx;
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
	transform: translateY(4rpx);
}

.color-orange {
	color: #e32416;
}
</style>
