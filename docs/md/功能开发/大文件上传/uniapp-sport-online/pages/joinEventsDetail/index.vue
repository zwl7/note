<template>
	<view class="page-container">
		<PrivacyPopup></PrivacyPopup>
		<Header v-model:value="activated" @confirm="changeTab" :info="eventInfo" :diplomaInfo="diplomaInfo"></Header>
		<view class="list-container">
			<view v-if="activated == 1">
				<view class="list-item" v-for="(item, index) in matchVedioList" :key="index">
					<MatchVedio :info="item" />
				</view>
			</view>
			<view v-if="activated == 2 && diplomaInfo.receive_status == 2">
				<view class="list-item">
					<MyDiploma :info="diplomaInfo" />
				</view>
			</view>
			<!-- 报名信息 -->
			<view v-if="activated == 3">
				<ApplyInfo :applyInfo="applyInfo" />
			</view>
			<Empty v-if="showEmpty" :title="emptyTitle" :type="emptyType" />
			<DiplomaTip :info="diplomaInfo" v-if="activated == 2 && showDiplomaTip" />
			<BottomButton v-show="activated == 1" :title="uploadStr" :disabled="uploadDisabled != 'in'" @submit="handleUpload" />
		</view>
	</view>
</template>
<script>
import Header from './components/Header.vue';
import DiplomaTip from './components/DiplomaTip.vue';
import MyDiploma from '@/pages/tabbar/mine/components/MyDiploma.vue';
import MatchVedio from '@/pages/tabbar/mine/components/MatchVedio.vue';
import Empty from '@/components/Empty.vue';
import BottomButton from '@/components/BottomButton.vue';
import ApplyInfo from './components/ApplyInfo.vue';
import { getMyVideoList, getApplyInfo, getCertDetail, getMyMatchActivity } from '@/apis/mine.js';
import { getMyEventDetailInfo } from '@/utils/token.js';
import { changeVideo, formatTimeBase } from '@/utils/util.js';
import PrivacyPopup from '@/components/PrivacyPopup.vue';
export default {
	components: {
		Header,
		DiplomaTip,
		MyDiploma,
		MatchVedio,
		ApplyInfo,
		Empty,
		BottomButton,
		PrivacyPopup
	},
	data() {
		return {
			activated: '1',
			match_activity_id: '',
			matchVedioList: [],
			diplomaInfo: {},
			showDiplomaTip: false,
			showDiplomaEmpty: false,
			eventInfo: {}, //比赛信息
			applyInfo: {}, // 报名信息
			uploadDisabled: '', //lt in gt
			applyShowTime: ''
		};
	},
	computed: {
		showEmpty() {
			let { activated, matchVedioList, diplomaInfo, showDiplomaTip, showDiplomaEmpty } = this;
			return (activated == 1 && matchVedioList.length == 0) || (activated == 2 && showDiplomaEmpty);
		},
		emptyTitle() {
			let { activated } = this;
			let titleMap = {
				1: '暂无赛事',
				2: '暂无证书'
			};
			return titleMap[activated];
		},
		emptyType() {
			let { activated } = this;
			let titleMap = {
				1: 2,
				2: 3
			};
			return titleMap[activated];
		},
		uploadStr() {
			let str = '上传视频';
			if (this.uploadDisabled === 'lt') {
				let time = formatTimeBase(this.eventInfo.upload_start_time);
				str = `上传作品时间${time}`;
			}

			if (this.uploadDisabled === 'gt') {
				str = '已截止上传作品';
			}

			return str;
		}
	},
	async onLoad(options) {
		let { match_activity_id } = options;
		this.match_activity_id = match_activity_id;
	},
	onShow(options) {
		if (this.match_activity_id) {
			this.getData();
		}
	},
	onPullDownRefresh() {
		if (this.match_activity_id) {
			this.getData();
		}
		uni.stopPullDownRefresh();
	},
	methods: {
		async getData() {
			await this.getMyEvent();
			this.getVideoList();
			this.getCert();
			this.getApplyInfo();
		},
		// 我的赛事
		getMyEvent() {
			return new Promise(async (resolve) => {
				let res = await getMyMatchActivity({ match_activity_id: this.match_activity_id });
				if (res.code === 200) {
					this.eventInfo = res.data[0];
					let uploadTimeStatus = this.$public.judgeTime(this.eventInfo.upload_start_time, this.eventInfo.upload_end_time);
					this.uploadDisabled = uploadTimeStatus;
				}
				resolve();
			});
		},
		// 获取视频
		async getVideoList() {
			let res = await getMyVideoList({ match_activity_id: this.match_activity_id });
			if (res.code === 200) {
				this.matchVedioList = res.data.video_list;
			}
		},
		// 获取证书
		async getCert() {
			this.showDiplomaEmpty = false;
			this.showDiplomaTip = false;
			let res = await getCertDetail({ match_activity_id: this.match_activity_id });
			if (res.code === 200) {
				if (Object.keys(res.data).length === 0) {
					let now = new Date().getTime();
					if (now < this.eventInfo.match_end_time * 1000 && now > this.eventInfo.match_start_time * 1000) {
						this.showDiplomaTip = true;
					} else {
						this.showDiplomaEmpty = true;
						this.showDiplomaTip = false;
					}
				} else {
					if (res.data.receive_status == 2) {
						this.diplomaInfo = res.data;
					} else {
						this.diplomaInfo = res.data;
						this.showDiplomaTip = true;
					}
				}
			}
		},
		// 切换按钮
		changeTab() {
			console.log(312312);
		},
		async handleUpload() {
			if (this.uploadDisabled == 'gt') {
				this.$public.showToast('已截止上传');
				return;
			}
			if (this.uploadDisabled == 'lt') {
				this.$public.showToast('未到上传作品时间');
				return;
			}
			let res = await changeVideo();
			if (!res.status) {
				return;
			}
			getApp().globalData.currentChangeVideo = res;
			uni.navigateTo({
				url: `/pages/uploadWorks/index?type=add&match_activity_id=${this.match_activity_id}`
			});
		},

		async getApplyInfo() {
			const { data } = await getApplyInfo({ match_activity_id: this.match_activity_id });
			this.applyInfo = data;
			console.log(data, 'data');
		}
	}
};
</script>
<style lang="scss" scoped>
.page-container {
	min-height: 100vh;
	background-color: #fafbfc;
}
.list-item {
	margin-bottom: 24rpx;
}
.list-container {
	padding: 32rpx 32rpx 200rpx;
}
</style>
