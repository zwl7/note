<template>
	<view v-if="innerShow" class="pirvacy-container" @click.capture="wrapClose">
		<view class="half-screen-dialog" @click.capture="preventEvent" style="position: fixed; bottom: 0">
			<view class="dialog__title">用户隐私保护提示</view>
			<view class="dialog__bd">
				<view class="dialog__tips">
					使用本系统前应当阅读并同意
					<text :style="{ color: color }" @click="openPrivacyContract">《用户隐私保护指引》</text>
					，点击同意即代表你已理解并同意该条款内容，拒绝将无法使用此应用的完整功能。
				</view>
			</view>
			<view class="dialog__ft">
				<view class="dialog__btn-area">
					<button id="disagree-btn" type="default" class="btn cancel" @click.capture="handleDisagree">拒绝</button>
					<button id="agree-btn" type="default" open-type="agreePrivacyAuthorization" class="btn confirm" @agreeprivacyauthorization="handleAgree">同意</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
let privacyHandler;
let privacyResolves = new Set();
let closeOtherPagePopUpHooks = new Set();

console.log('----------------', uni.onNeedPrivacyAuthorization);
if (uni.onNeedPrivacyAuthorization) {
	uni.onNeedPrivacyAuthorization((resolve) => {
		console.log('触发 onNeedPrivacyAuthorization', privacyHandler);
		if (typeof privacyHandler === 'function') {
			privacyHandler(resolve);
		}
	});
}

const closeOtherPagePopUp = (closePopUp) => {
	closeOtherPagePopUpHooks.forEach((hook) => {
		if (closePopUp !== hook) {
			hook();
		}
	});
};

export default {
	name: 'PrivacyPopup',
	props: {
		color: {
			type: String,
			default: '#f94e47'
		}
	},
	data() {
		return {
			innerShow: false,
			height: 0
		};
	},
	created() {
		const closePopUp = () => {
			this.disPopUp();
		};
		privacyHandler = (resolve) => {
			privacyResolves.add(resolve);
			this.popUp();
			closeOtherPagePopUp(closePopUp);
		};

		this.closePopUp = closePopUp;
		closeOtherPagePopUpHooks.add(this.closePopUp);
	},
	destroyed() {
		closeOtherPagePopUpHooks.delete(this.closePopUp);
	},
	mounted() {
		if (this.closePopUp) {
			privacyHandler = (resolve) => {
				privacyResolves.add(resolve);
				this.popUp();
				// 额外逻辑：当前页面的隐私弹窗弹起的时候，关掉其他页面的隐私弹窗
				closeOtherPagePopUp(this.closePopUp);
			};
		}
	},
	methods: {
		wrapClose() {
			this.disPopUp();
		},
		preventEvent() {},
		handleAgree(e) {
			this.disPopUp();
			privacyResolves.forEach((resolve) => {
				resolve({
					event: 'agree',
					buttonId: 'agree-btn'
				});
			});
			privacyResolves.clear();
		},
		handleDisagree(e) {
			this.disPopUp();
			privacyResolves.forEach((resolve) => {
				resolve({
					event: 'disagree'
				});
			});
			privacyResolves.clear();
		},
		popUp() {
			if (this.innerShow === false) {
				this.innerShow = true;
			}
		},
		disPopUp() {
			if (this.innerShow === true) {
				this.innerShow = false;
			}
		},
		openPrivacyContract() {
			uni.openPrivacyContract({
				success: (res) => {
					console.log('openPrivacyContract success');
				},
				fail: (res) => {
					console.error('openPrivacyContract fail', res);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.pirvacy-container {
	position: fixed;
	z-index: 10000;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);
	box-sizing: border-box;
	left: 0;
	top: 0;
}

.pirvacy-container .half-screen-dialog {
	width: 100%;
	background-color: #fff;
	border-radius: 16rpx 16rpx 0 0;
	padding: 40rpx 64rpx 0;
	box-sizing: border-box;
}

.pirvacy-container .half-screen-dialog .dialog__title {
	font-size: 32rpx;
	text-align: center;
	margin-bottom: 32rpx;
	color: #181818;
}

.pirvacy-container .half-screen-dialog .dialog__tips {
	color: #acacac;
	line-height: 1.6;
	font-size: 28rpx;
	text-indent: 2em;
}

.pirvacy-container .half-screen-dialog .dialog__btn-area {
	display: flex;
	align-items: center;
	padding: 64rpx 50rpx 50rpx;
}

.pirvacy-container .half-screen-dialog .dialog__btn-area .btn {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 226rpx;
	height: 76rpx;
	font-size: 28rpx;
	box-sizing: border-box;
	margin-left: auto;
	margin-right: auto;
	padding: 12rpx 0;
	box-sizing: border-box;
	text-align: center;
	text-decoration: none;
	border-radius: 16rpx;
	-webkit-tap-highlight-color: transparent;
	-webkit-user-select: none;
	user-select: none;
	border: none;
}

.pirvacy-container .half-screen-dialog .dialog__btn-area button::after {
	border: none;
}

.pirvacy-container .half-screen-dialog .dialog__btn-area .cancel {
	background-color: #f2f2f2;
	color: #07c160;
}

.pirvacy-container .half-screen-dialog .dialog__btn-area .confirm {
	background-color: #07c160;
	color: #fff;
}
</style>
