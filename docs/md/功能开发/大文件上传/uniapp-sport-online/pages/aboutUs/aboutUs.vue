<template>
	<view class="main">
		<view class="logo">
			<image src="https://cdn-static.papa.com.cn/sport_online/logo.png" mode="aspectFit" class="image"></image>
		</view>
		<view class="text">
			<view class="text1">全民健身线上赛是一个创新的线上运动会平台，致力于展现运动爱好者的才华和热情，通过上传、分享机制，让每个人都能感受到运动的乐趣和挑战。</view>
			<view class="text2">
				在这里，你可以上传自己录制的运动视频，与大家分享你的热血与成就，接受来自朋友的赞美和鼓励。同时，你还可以欣赏他人的作品，为他们的精彩表现点赞，为运动爱好者们打造一个集分享、交流、竞技与一体的多元平台！
			</view>
			<view class="text3"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #fff;
}

.main {
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 0 24rpx;
	min-height: 100vh;
	box-sizing: border-box;
	position: relative;
	padding-top: 96rpx;
}

.logo {
	width: 198rpx;
	height: 198rpx;
	border-radius: 24rpx;
	overflow: hidden;
}

.logo .image {
	display: block;
	width: 100%;
	height: 100%;
}

.text {
	margin-top: 72rpx;
	color: #333333;
	font-size: 30rpx;
	line-height: 1.5;
	padding: 0 48rpx;
}

.text1 {
	margin-bottom: 15rpx;
	text-indent: 2em;
}
.text2 {
	text-indent: 2em;
}

.text5 {
	margin-top: 48rpx;
}

.msg {
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 58rpx;
	text-align: center;
	color: #999999;
}

.view-mpre {
	display: flex;
	align-items: center;
	justify-content: center;
	color: #bbbbbb;
	font-size: 28rpx;
}

.view-mpre::before,
.view-mpre::after {
	display: block;
	content: '';
	width: 70rpx;
	height: 2rpx;
	background-color: #bbbbbb;
	margin: 0 25rpx;
}
</style>
