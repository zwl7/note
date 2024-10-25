<template>
	<view class="container">
		<view v-if="showSwiper" class="detail_bg">
			<swiper class="detail_bg" :autoplay="3000" indicator-color="white">
				<swiper-item v-for="(image, index) in info.images_url" :key="index">
					<image :src="image" class="image_item"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="content">
			<view class="content_top" style="position: relative">
				<view class="title">{{ info.name }} </view>
			</view>
			<view class="des-content" style="padding:0 15px;">{{ info.released_time?info.released_time:info.c_time }}
			</view>
			<view class="des-content" v-html="info.des">
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getWxNoticeDetail
	} from '@/apis/common.js'
	export default {
		data() {
			return {
				info: {},
				notice_id: "",
				showSwiper: false
			}
		},
		onLoad(options) {
			this.notice_id = options.notice_id
			this.getWxNoticeDetail()
		},
		methods: {
			async getWxNoticeDetail() {
				let res = await getWxNoticeDetail({
					notice_id: this.notice_id
				})
				if (res.code == 200) {
					let data = res.data
					data.des = data.des.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
					if ((data.images_url && data.images_url.length > 0) || (data.video_url && data.video_url.length > 0)) {
						this.showSwiper = true
					}
					this.info = data
				} else {
					console.error(res)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		background-color: #fff;
	}

	.content_top {
		padding: 15px 16px;
		background: #fff;
		position: relative;
	}

	.title {
		font-size: 18px;
		color: #333333;
		letter-spacing: 0;
		line-height: 24px;
		font-weight: bold;
	}

	.des-content {
		padding: 0 15px 24px;
		background: #fff;
		font-size: 15px;
		color: #606266;
		letter-spacing: 0;
		line-height: 26px;
		white-space: normal !important;
		max-width: 100% !important;
		// width: auto !important;
		// overflow: auto;
	}

	.des-content ::v-deep .okr-block-clipboard {
		width: 100% !important;
		white-space: normal;
		overflow: hidden;
	}

	.des-content ::v-deep view {
		white-space: normal !important;

		view {
			word-break: break-all;
			white-space: normal !important;
		}
	}

	.des-content::v-deep img {
		width: auto !important;
		height: auto !important;
		max-width: 100% !important;
		max-height: 100% !important;
	}

	.image_item {
		display: block;
		height: 183px;
		width: 100%;
		object-fit: cover;
	}
</style>