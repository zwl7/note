<template>
	<view class="index-container">
		<PageLoading v-if="loading" />
		<NavBar :nav-color="primaryColor" />
		<Banner :list="swiperList" @click="clickSwiper" />
		<NetworkGame :list="networkGameList" @click="clickProject" />
		<ShowStyle :list="showStyleList" :count="showStyleCount" @click="clickProject" />
		<Notice :list="noticeList" @click="clickNoticeItem" @clickIcon="clickNoticeIcon" />
		<RecommendVedio :list="fitList" @click="clickRecommend" />
		<Production :list="productionList" :project="projectList" @confirm="getProductionParams" />
	</view>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import Banner from './components/Banner.vue';
import NetworkGame from './components/NetworkGame.vue';
import ShowStyle from './components/ShowStyle.vue';
import RecommendVedio from './components/RecommendVedio.vue';
import Production from './components/production.vue';
import Notice from './components/Notice.vue';
import PageLoading from '@/components/PageLoading.vue';
import { getWxRecommendList, getWxNoticeList, getNetworkGameList, getShowStyleList, getVideoList, getFit } from './extend.js';
export default {
	components: {
		NavBar,
		Banner,
		NetworkGame,
		ShowStyle,
		RecommendVedio,
		Production,
		Notice,
		PageLoading
	},
	data() {
		return {
			loading: true,
			primaryColor: '#f5463c',
			swiperList: [], //轮播图
			noticeList: [], //公告
			networkGameList: [], //网络对弈
			showStyleList: [], //风采展示
			projectList: [], //参赛作品项目列表
			fitList: [], //健身指导视频
			productionList: [], //作品展示
			productionCount: 0,
			proSearchParams: {}, //作品展示搜索参数
			proPage: 1,
			proSize: 6,
			productionLoading: false,
			productionFinished: false,
			showStyleCount: 0 //风采展示数量
		};
	},
	onLoad() {
		this.getData();
	},
	onReachBottom() {
		// this.loadMore();
	},
	onPullDownRefresh() {
		this.proPage = 1;
		this.productionList = [];
		this.$nextTick(() => {
			getVideoList.call(this, true);
		});
	},
	onShareAppMessage(res) {
		let that = this;
		let path = `/pages/tabbar/home/index`;
		return {
			title: '全民健身线上赛',
			path: path,
			withShareTicket: true
		};
	},
	methods: {
		getData() {
			this.loading = true;
			Promise.all([
				getWxRecommendList.call(this),
				getWxNoticeList.call(this),
				getNetworkGameList.call(this),
				getShowStyleList.call(this),
				getVideoList.call(this),
				getFit.call(this)
			]).then(async (res) => {
				await this.$nextTick();
				this.loading = false;
			});
		},
		clickSwiper(item) {
			console.log('点击轮播图', item);
			if (item.type_id == 1) {
				if (item.topic_id) {
					uni.navigateTo({
						url: '/pages/notice/notice?notice_id=' + item.topic_id
					});
				}
				return;
			}
			if (item.type_id == 7) {
				if (item.url) {
					this.$public.openUrl(item.url);
				}
				return;
			}
		},
		// 点击网络项目 风采项目
		clickProject(item) {
			if (!item.match_activity_id) {
				this.$public.showToast('当前项目未关联相关活动');
				return;
			}
			let { match_activity_id, project_id } = item;
			uni.navigateTo({
				url: `/pages/eventsDetail/index?match_activity_id=${match_activity_id}`
			});
		},
		clickNoticeItem(item) {
			uni.navigateTo({
				url: '/pages/notice/notice?notice_id=' + item.notice_id
			});
		},
		clickNoticeIcon(item) {
			uni.navigateTo({
				url: '/pages/noticeInformation/index'
			});
		},
		clickRecommend(item) {
			console.log(item);
			uni.navigateTo({
				url: `/pages/videoDetail/index?video_type=fit&activity_video_id=${item.activity_video_id}`
			});
		},
		loadMore() {
			console.log('触底加载');
			if (this.productionFinished) {
				console.log('加载完成');
				this.productionLoading = false;
				return;
			}
			this.proPage = this.proPage + 1;
			getVideoList.call(this);
		},
		getProductionParams(e) {
			this.proSearchParams = e;
			this.proPage = 1;
			this.productionList = [];
			this.$nextTick(() => {
				getVideoList.call(this, true);
			});
		}
	}
};
</script>
<style lang="scss">
page {
	background-color: #f8f9fb !important;
	min-height: 100vh;
}
</style>
