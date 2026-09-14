<template>
	<view class="notice-information-container">
		<view class="header-box">
			<NavBar :nav-color="primaryColor" show-back />
			<div class="header-title">公告资讯</div>
			<image class="header-bg" src="../../static/imgs/notice-bg.png" />
		</view>
		<view class="tab-box">
			<view v-for="(item, index) in typeList" :key="index" :class="['item', { activated: activated === item.id }]" @click="changeTab(item)">
				<text>
					{{ item.title }}
				</text>
				<uni-icons custom-prefix="iconfont" type="icon-tabline" color="#f5463c" size="5" v-if="activated === item.id" class="iconfont"></uni-icons>
			</view>
		</view>
		<view class="list-container">
			<view class="list-item" v-for="(item, index) in list" :key="index">
				<NoticeList :index="index" :info="item" @click="open(item.notice_id, item.url)" />
			</view>
			<Empty v-if="showEmpty" title="暂无资讯" />
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import NoticeList from './components/noticeList.vue';
import Empty from '@/components/Empty.vue';
import { getWxNoticeList } from '@/apis/common.js';
export default {
	components: {
		NavBar,
		NoticeList,
		Empty
	},
	data() {
		return {
			primaryColor: 'transparent',
			list: [],
			page: 1,
			count: 0,
			activated: 1,
			loading: false,
			finished: false,
			typeList: [
				{ id: 1, title: '全部' },
				{ id: 11, title: '最新热点' },
				{ id: 12, title: '比赛咨询' }
			]
		};
	},
	computed: {
		loadStatus() {
			if (this.finished) {
				return 'no-more';
			} else {
				if (this.loading) {
					return 'loading';
				} else {
					return 'more';
				}
			}
		},
		showSkeleton() {
			if (this.list.length == 0 && !this.finished && this.loading) {
				return true;
			}
		},
		showEmpty() {
			if (this.list.length == 0 && this.finished && !this.loading) {
				return true;
			}
		}
	},
	onLoad() {
		this.getList();
	},
	onReachBottom() {
		this.load();
	},
	onPullDownRefresh() {
		this.page = 1;
		this.list = [];
		this.$nextTick(() => {
			this.getList(true);
		});
	},
	onShareAppMessage() {},
	methods: {
		changeTab(item) {
			this.activated = item.id;
			this.page = 1;
			this.list = [];
			this.finished = false;
			this.loading = false;
			this.$nextTick(() => {
				this.getList();
			});
		},
		async getList(refresh) {
			const param = {
				page: this.page,
				size: 10,
				type: this.activated
			};

			if (this.activated == 1) {
				delete param.type;
			}
			this.loading = true;
			let res = await getWxNoticeList(param);
			let _this = this;
			if (res.code === 200) {
				res.data.list.forEach((item) => {
					item.c_time = item.c_time.replace(/\-/g, '/');
					item.images_url = item.images_url.length > 0 ? item.images_url[0] : '';
				});
				this.list = this.list.concat(res.data.list);
				this.count = res.data.count;
				this.loading = false;
				if (res.data.list.length === 0) {
					this.finished = true;
				}
				if (!this.finished) {
					this.$public.isFullScreen().then((fres) => {
						let { windowHeight, scrollHeight } = fres;
						if (windowHeight + 70 >= scrollHeight) {
							_this.load();
						}
					});
				}
				if (refresh) {
					uni.stopPullDownRefresh();
				}
			} else {
				this.$showToastNone(res.message);
			}
		},
		load() {
			console.log('触底加载');
			if (this.finish) {
				console.log('加载完成');
				this.loading = false;
				return;
			}
			this.page = this.page + 1;
			this.getList();
		},
		open(notice_id, url) {
			if (url) {
				uni.navigateTo({
					url: '/pages/webView/webView?url=' + encodeURIComponent(url)
				});
				return;
			}
			uni.navigateTo({
				url: '/pages/notice/notice?notice_id=' + notice_id
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.notice-information-container {
	.header-box {
		width: 100%;
		height: 424rpx;
		border-radius: 0 0 0 92rpx;
		position: relative;
		overflow: hidden;
		.header-title {
			position: absolute;
			color: #fff;
			left: 84rpx;
			bottom: 98rpx;
			font-size: 48rpx;
			font-weight: 500;
			z-index: 2;
		}
		.header-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
		}
	}
	.list-container {
		padding: 8rpx 32rpx;
	}
}

// tab
.tab-box {
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
		color: #323233;
		&::before {
			transform: translateX(-50%) scale(1);
			transition: all 0.2s;
		}
	}
}
</style>
