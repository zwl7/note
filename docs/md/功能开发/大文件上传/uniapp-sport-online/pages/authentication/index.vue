<template>
	<view class="certificate-container">
		<view class="common-line">
			<view class="c-title">真实姓名</view>
			<input type="text" v-model="name" placeholder-style="color:#B0B1B2;font-size:28rpx;text-align:right" placeholder="请输入真实姓名" />
		</view>
		<view class="common-line">
			<view class="c-title">身份证号</view>
			<input type="text" v-model="credentials_number" placeholder-style="color:#B0B1B2;font-size:28rpx;text-align:right" placeholder="请输入身份证号" />
		</view>
		<view class="submit" @click="handleConfirm">确定</view>
	</view>
</template>

<script>
import { handleAuthenticate } from '@/apis/login.js';
import { buttonClicked } from '@/utils/util.js';
export default {
	data() {
		return {
			name: '',
			credentials_number: '',
			loading: false
		};
	},
	onLoad(options) {},
	methods: {
		validateValue() {
			if (!String(this.name).trim()) {
				this.$public.showToast('请输入真实姓名');
				return false;
			}

			if (!String(this.credentials_number).trim()) {
				this.$public.showToast('请输入身份证号');
				return false;
			}
			return true;
		},
		handleConfirm: buttonClicked(function () {
			if (!this.validateValue()) {
				return;
			}
			if (this.loading) {
				return;
			}
			let obj = {
				name: this.name,
				credentials_number: this.credentials_number
			};
			let app = getApp();
			handleAuthenticate(obj)
				.then((res) => {
					if (res.code === 200) {
						app.globalData.userInfo.is_authenticate = 1;
						uni.showToast({
							title: '认证成功'
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 1000);
					} else {
						this.$public.showToast(res.message);
					}
					this.loading = false;
				})
				.catch((err) => {
					this.loading = false;
				});
		}, 1000)
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
