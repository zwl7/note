<template>
	<view :class="['main-container', styleObj.hederBgStyle]">
		<NavBar :nav-color="primaryColor" show-back></NavBar>
		<image :src="styleObj.hederBgUrl" class="box1" mode=""></image>
		<view class="out-container">
			<view class="main-card">
				<view class="header-box">{{ info.name }}</view>
				<view class="content-box">
					<image src="../../../../static/imgs/avatar.png" class="avatar" mode=""></image>
					<view class="user-info">
						<view class="name">{{ info.join_activity_member_name }}</view>
						<view class="tag">{{ info.project_name }}</view>
					</view>
					<view class="right-info" v-if="showRightInfo">
						<text class="text" v-if="showText">{{ textStr }}</text>
						<image v-if="showImage" :src="styleObj.rankImg" class="rank_image" mode=""></image>
					</view>
				</view>
				<image :src="styleObj.cardDecorate" class="box2" mode=""></image>
			</view>
		</view>
		<view class="bottom-box">
			<view class="tab-box">
				<view v-for="(item, index) in typeList" :key="index" :class="['item', { activated: value == item.id }]" @click="changeTab(item)">
					<text>{{ item.title }}</text>
					<uni-icons custom-prefix="iconfont" type="icon-tabline" color="red" size="5" v-if="value == item.id" class="iconfont"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
const timeStatusMap = {
	1: '报名中',
	2: '比赛中',
	3: '比赛结束'
};
let rankImgObj = {
	1: {
		hederBgUrl: 'https://cdn-static.papa.com.cn/sport_online/header-decorate-origin.png',
		cardDecorate: 'https://cdn-static.papa.com.cn/sport_online/header-decorate-origin_2.png',
		rankImg: 'https://cdn-static.papa.com.cn/sport_online/rank_1.png',
		hederBgStyle: 'main-container-bg-origin'
	},
	2: {
		hederBgUrl: 'https://cdn-static.papa.com.cn/sport_online/header-decorate-blue.png',
		cardDecorate: 'https://cdn-static.papa.com.cn/sport_online/header-decorate-blue_2.png',
		rankImg: 'https://cdn-static.papa.com.cn/sport_online/rank_2.png',
		hederBgStyle: 'main-container-bg-blue'
	},
	3: {
		hederBgUrl: 'https://cdn-static.papa.com.cn/sport_online/header-decorate-white.png',
		cardDecorate: 'https://cdn-static.papa.com.cn/sport_online/header-decorate-white_2.png',
		rankImg: 'https://cdn-static.papa.com.cn/sport_online/rank_3.png',
		hederBgStyle: 'main-container-bg-white'
	}
};

export default {
	components: {
		NavBar
	},
	props: {
		info: {
			type: Object,
			default: () => {
				return {};
			}
		},
		diplomaInfo: {
			type: Object,
			default: () => {
				return {};
			}
		},
		value: {
			type: [String, Number],
			default: '1'
		}
	},
	computed: {
		showRightInfo() {
			let { time_status, is_upload, is_get, rank } = this.info;
			return time_status == 1 || time_status == 2 || time_status == 3 || is_get == 1;
		},
		textStr() {
			let { time_status } = this.info;
			return timeStatusMap[time_status];
		},
		showText() {
			let { time_status, is_upload, is_get, rank } = this.info;
			return is_get == 1;
		},
		showImage() {
			let { is_get, rank } = this.info;
			let flag = !this.showText && is_get == 2 && [1, 2, 3].indexOf(rank) != -1;
			if (flag) {
				this.styleObj = rankImgObj[rank];
			}
			return flag;
		}
	},
	data() {
		return {
			primaryColor: 'transparent',
			typeList: [
				{ id: 1, title: '参赛视频' },
				{ id: 2, title: '我的证书' },
				{ id: 3, title: '报名信息' }
			],
			styleObj: {
				hederBgUrl: 'https://cdn-static.papa.com.cn/sport_online/header-decorate-pink.png',
				cardDecorate: 'https://cdn-static.papa.com.cn/sport_online/header-decorate-pink_2.png',
				rankImg: '',
				hederBgStyle: 'main-container-bg-blue'
			}
		};
	},
	methods: {
		changeTab(item) {
			this.$emit('update:value', item.id);
			this.$emit('confirm', item.id);
		}
	}
};
</script>

<style lang="scss" scoped>
.page-container {
	width: 100%;
	min-height: 100vh;
	background-color: #fff;
}
.main-container {
	width: 100%;
	height: 582rpx;
	box-sizing: border-box;
	opacity: 1;
	background: linear-gradient(107.2deg, #ffe5c7 0%, #ffbaba 100%);
	position: relative;

	.bottom-box {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 122rpx;
		opacity: 1;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 93.06%, rgba(253, 253, 254, 1) 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
}
.out-container {
	padding: 32rpx 32rpx;
}

.box1 {
	position: absolute;
	left: 42rpx;
	top: 48rpx;
	display: block;
	width: 286rpx;
	height: 328rpx;
	z-index: 0;
}

.main-card {
	position: relative;
	z-index: 10;
	width: 100%;
	height: 143px;
	opacity: 1;
	border-radius: 12px;
	overflow: hidden;
	background: rgba(255, 255, 255, 0.77);
	margin: 0 auto;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	.header-box {
		flex-shrink: 0;
		height: 72rpx;
		width: 100%;
		display: flex;
		line-height: 72rpx;
		box-sizing: border-box;
		padding: 0 32rpx;
		font-size: 32rpx;
		color: #fff;
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		background: linear-gradient(270deg, rgba(255, 62, 0, 0.4) 0%, rgba(255, 66, 0, 1) 100%);
	}
	.box2 {
		position: absolute;
		left: 20rpx;
		bottom: -34rpx;
		display: block;
		width: 100%;
		height: 144rpx;
		z-index: 10;
		transform: rotate(3deg);
	}
}
.content-box {
	flex: 1;
	display: flex;
	padding-top: 20rpx;
	padding: 40rpx 32rpx 32rpx;
	.avatar {
		display: block;
		width: 112rpx;
		height: 112rpx;
		border-radius: 112rpx;
		border: 4rpx solid #fff;
	}
	.user-info {
		margin-left: 32rpx;
		flex: 1;
		padding-right: 160rpx;
		.name {
			font-size: 36rpx;
			color: #9c241d;
			font-weight: 500;
		}
		.tag {
			display: inline-block;
			font-size: 24rpx;
			font-weight: 400;
			color: #ff8a06;
			background-color: #ffdec5;
			padding: 4rpx 12rpx;
			border-radius: 8rpx;
			margin-top: 24rpx;
		}
	}
	.right-info {
		position: absolute;
		right: 0;
		top: 48rpx;
		width: 250rpx;
		height: 250rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.rank_image {
			display: block;
			width: 250rpx;
			height: 250rpx;
		}
		.text {
			color: #ed6a0c;
			font-size: 36rpx;
			font-weight: 600;
		}
	}
}

.tab-box {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 88rpx;
	z-index: 10;
	display: flex;
	align-items: center;
	.item {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #646566;
		transition: all 0.2s;
		position: relative;
		.iconfont {
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			opacity: 1;
		}
	}
	.activated {
		font-size: 32rpx;
		font-weight: 600;
		position: relative;
		transition: all 0.2s;
	}
}
.main-container-bg-pink {
	background: linear-gradient(107.2deg, #ffe5c7 0%, #ffbaba 100%);
}
.main-container-bg-blue {
	background: linear-gradient(107.2deg, #efd1fa 0%, #bed5f8 100%);
}
.main-container-bg-white {
	background: linear-gradient(107.2deg, #98a6bd 0%, #ccdcf2 100%);
}
.main-container-bg-origin {
	background: linear-gradient(107.2deg, #ffe6ae 0%, #ffbfa1 100%);
}
</style>
