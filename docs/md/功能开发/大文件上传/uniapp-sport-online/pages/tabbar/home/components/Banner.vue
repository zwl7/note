<template>
	<view class="banner-container">
		<view class="banner-bg"></view>
		<view class="swiper-box" v-if="list.length != 1">
			<swiper class="swiper" @change="monitorCurrent" circular :current="currentswiper">
				<swiper-item v-for="(item, index) in list" :key="index" @click="handleItem(item)">
					<image :src="item.images_url" class="image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="dot-box">
				<view :class="['dot', currentswiper == index ? 'active' : '']" v-for="(item, index) in list.length" :key="item"></view>
			</view>
		</view>
		<view class="swiper-box" v-if="list.length == 1">
			<view class="swiper">
				<image v-for="(item, index) in list" :key="index" :src="item.images_url" class="image" @click="handleItem(item)"></image>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	components: {},
	props: {
		list: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	computed: {
		indicatorDots() {
			return false;
		},
		swiperName() {
			return this.list[this.currentswiper] ? this.list[this.currentswiper].name : '';
		}
	},
	watch: {
		list: {
			handler: function (val) {
				if (val && val.length > 0) {
					this.currentswiper = 0;
				}
			},
			immediate: true
		}
	},
	data() {
		return {
			autoplay: false,
			interval: 2000,
			duration: 500,
			currentswiper: 0,
			name: ''
		};
	},
	methods: {
		handleItem(item) {
			this.$emit('click', item);
		},
		monitorCurrent(e) {
			this.currentswiper = e.detail.current;
		}
	}
};
</script>
<style lang="scss" scoped>
.banner-container {
	width: 100%;
	height: 446rpx;
	position: relative;
}

.banner-bg {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 248rpx;
	border-radius: 0 0 0 92rpx;
	background-color: $pp-color-primary;
	z-index: -1;
}

.swiper-box {
	padding: 20rpx 32rpx;
	z-index: 10;
	position: relative;

	.swiper {
		width: 100%;
		height: 360rpx;
		border-radius: 24rpx;
		overflow: hidden;
		background-color: #fff;
		box-shadow: 0rpx 2rpx 84rpx rgba(245, 56, 45, 0.68);
	}

	.image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.dot-box {
		position: absolute;
		bottom: 42rpx;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		flex-shrink: 0;

		.dot {
			width: 24rpx;
			height: 6rpx;
			background: rgba(235, 237, 240, 1);
			margin: 0 6rpx;
		}

		.active {
			background-color: $pp-color-primary;
			transition: all 1s;
		}
	}
}
</style>
