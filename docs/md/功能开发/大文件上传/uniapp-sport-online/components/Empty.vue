<template>
	<view class="empty_container empty-class" :style="{ paddingTop: paddingTop }">
		<image :src="image" mode="widthFix" class="icon_imgae"></image>
		<view class="title title-class">{{ title }}</view>
		<view class="tips tip-class">{{ tip }}</view>
	</view>
</template>

<script>
export default {
	name: 'empty',
	props: {
		title: String,
		tip: String,
		showPaddingTop: {
			type: Boolean,
			default: true
		},
		paddingTop: {
			type: String,
			default: '80rpx'
		},
		type: {
			type: [String, Number],
			default: 2
		}
	},
	computed: {
		image() {
			if (this.type == 1) {
				return this.no_info;
			}
			if (this.type == 2) {
				return this.no_vedio;
			}
			if (this.type == 3) {
				return this.no_diploma;
			}
		}
	},
	data() {
		return {
			no_info: 'https://cdn-static.papa.com.cn/sport_online/no_info.png',
			no_vedio: 'https://cdn-static.papa.com.cn/sport_online/no_video.png',
			no_diploma: 'https://cdn-static.papa.com.cn/sport_online/no_diploma.png'
		};
	}
};
</script>

<style lang="scss" scoped>
.empty_container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.icon_imgae_box {
	display: block;
	width: 320rpx;
	height: 320rpx;
}

.icon_imgae {
	display: block;
	width: 320rpx;
	height: 320rpx;
}

.title {
	font-size: 28rpx;
	color: #969799;
	margin: 32rpx 0;
}

.tips {
	font-size: 28rpx;
	color: #999999;
}
</style>
