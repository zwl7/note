<template>
	<uni-popup ref="popup">
		<view class="wx-dialog">
			<image v-if="show_image" :src="image_url" mode="aspectFit" class="image" />
			<view class="title">
				{{ title }}
			</view>
			<view class="tips">
				{{ tip }}
			</view>
			<view class="buttons_box">
				<view class="button right confirm" @click="_cancelEvent">知道了</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
import { buttonClicked } from '@/utils/util.js';
export default {
	name: 'BigDialog',
	props: {
		disWrapClose: {
			type: Boolean,
			value: false
		},
		type: {
			type: Number,
			value: -1
		},
		cancelText: {
			type: String,
			value: '取消'
		},
		confirmText: {
			type: String,
			value: '确认'
		},
		title: {
			type: String,
			value: '提示'
		},
		tip: {
			type: String,
			value: ''
		},
		show_image: {
			type: Boolean,
			value: false
		},
		image_url: {
			type: String
		}
	},
	data() {
		return {
			isShow: false,
			showMethod: false,
			hiddenMethod: false,
			updatePanelAnimationData: ''
		};
	},
	methods: {
		hideDialog() {
			if (this.hiddenMethod || this.showMethod) {
				return;
			}
			this.$refs.popup.close();
		},
		showDialog() {
			if (this.isShow || this.hiddenMethod || this.showMethod) {
				return;
			}
			this.$refs.popup.open();
		},
		wrapClose: buttonClicked(function () {
			this.disWrapClose || this.hideDialog();
		}, 800),
		_cancelEvent: buttonClicked(function () {
			this.$emit('cancelEvent', '取消');
			this.hideDialog();
		}, 800),
		_confirmEvent: buttonClicked(function (event) {
			this.$emit('confirmEvent', event);
			this.hideDialog();
		}, 800),
		preventEvent() {}
	}
};
</script>

<style lang="scss">
.wx-dialog,
.wx_dialog_container {
	align-items: center;
	display: flex;
}

.wx-dialog {
	border-radius: 24rpx;
	overflow: hidden;
	background-color: #fff;
	background: #fff;
	flex-flow: column;
	margin: 0 auto;
	position: relative;
	text-align: center;
	width: 568rpx;

	box-sizing: border-box;
	padding: 80rpx 48rpx 72rpx;
}

.wx-dialog .image {
	display: block;
	width: 116rpx;
	height: 116rpx;
	margin-bottom: 32rpx;
}

.wx-dialog .title {
	font-size: 34rpx;
	color: #000000;
	line-height: 1;
	margin-bottom: 32rpx;
}

.wx-dialog .tips {
	font-size: 30rpx;
	color: #999999;
	line-height: 1.5;
	margin-bottom: 60rpx;
	word-break: break-all;
}

.buttons_box {
	display: flex;
	width: 100%;
}

.vertical_box {
	flex-direction: column;
}

.buttons_box .button {
	width: 100%;
	height: 88rpx;
	border-radius: 88rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
}

.button1 {
	margin-bottom: 24rpx;
}

.buttons_box .left {
	margin-right: 12rpx;
}

.buttons_box .right {
	margin-left: 12rpx;
}

.confirm {
	background-color: $pp-color-primary;
	color: #fff;
}

.cancel {
	background-color: #f5f5f5;
	color: #333333;
}

.contact_text {
	display: inline;
	padding: 0;
	margin: 0;
	border: none;
	line-height: 1.5;
	font-size: 30rpx;
	color: #ff7200;
	outline: none;
	background-color: #fff;
}
.contact_text::after {
	border: none;
	padding: none;
	margin: none;
}
</style>
