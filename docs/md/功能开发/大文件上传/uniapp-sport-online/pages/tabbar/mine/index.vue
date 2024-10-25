<template>
	<view class="mine-container">
		<PrivacyPopup></PrivacyPopup>
		<view class="header-box">
			<image src="../../../static/imgs/mine-header.png" class="box1" mode="aspectFill"></image>
			<NavBar :nav-color="primaryColor"></NavBar>
			<view class="header-box-main">
				<view class="line-1">
					<view class="avatar-box">
						<image :src="avatar_url" class="avatar" mode="aspectFill"></image>
					</view>
					<view class="name">{{ nick_name }}</view>
					<view class="setting" @click="handleSetting">
						<uni-icons custom-prefix="iconfont" type="icon-a-Frame34" color="#fff" size="24"></uni-icons>
					</view>
				</view>
			</view>
			<view class="tab-box">
				<view v-for="(item, index) in typeList" :key="index" :class="['item', { activated: activated === item.id }]" @click="changeTab(item)">
					<text>{{ item.title }}</text>
					<uni-icons custom-prefix="iconfont" type="icon-tabline" color="#fff" size="4" v-if="activated === item.id" class="iconfont"></uni-icons>
				</view>
			</view>
		</view>
		<view class="list-container">
			<view v-if="activated == 3" style="margin-bottom: 26rpx">
				<DiplomaTip></DiplomaTip>
			</view>
			<view v-if="activated == 1">
				<view class="list-item" v-for="(item, index) in raceList" :key="index">
					<MyRaceItem :info="item" />
				</view>
			</view>
			<view v-if="activated == 2">
				<view class="list-item" v-for="(item, index) in matchVedioList" :key="index">
					<MatchVedio :info="item" @update="handleUpdate" />
				</view>
			</view>
			<view v-if="activated == 3">
				<view class="list-item" v-for="(item, index) in diplomaList" :key="index">
					<MyDiploma :info="item" />
				</view>
			</view>
			<Empty v-if="showEmpty" :title="emptyTitle" :type="emptyType" />
		</view>
	</view>
</template>

<script>
import { getWxMember } from '@/apis/mine.js';
import NavBar from '@/components/NavBar.vue';
import MyRaceItem from './components/MyRaceItem.vue';
import MatchVedio from './components/MatchVedio.vue';
import MyDiploma from './components/MyDiploma.vue';
import DiplomaTip from './components/DiplomaTip.vue';
import { getMyMatchActivity, getMyVideoList, getMyCertList } from '@/apis/mine.js';
import Empty from '@/components/Empty.vue';
import PageLoading from '@/components/PageLoading.vue';
import PrivacyPopup from '@/components/PrivacyPopup.vue';
export default {
	components: {
		NavBar,
		MyRaceItem,
		MatchVedio,
		MyDiploma,
		DiplomaTip,
		Empty,
		PageLoading,
		PrivacyPopup
	},
	data() {
		return {
			default_img: 'https://cdn-static.papa.com.cn/ppcs_mp/avatar.png',
			primaryColor: 'transparent',
			activated: 1,
			typeList: [
				{ id: 1, title: '我的赛事' },
				{ id: 2, title: '参赛视频' },
				{ id: 3, title: '我的证书' }
			],
			raceList: [], //我的参赛
			matchVedioList: [], //参赛视频
			diplomaList: [], //我的证书
			userInfo: {},
			avatar_url: '',
			nick_name: '',
			is_auth: '',
			phone: ''
		};
	},
	computed: {
		showEmpty() {
			let { activated, raceList, matchVedioList, diplomaList } = this;
			return (activated == 1 && raceList.length == 0) || (activated == 2 && matchVedioList.length == 0) || (activated == 3 && diplomaList.length == 0);
		},
		emptyTitle() {
			let { activated } = this;
			let titleMap = {
				1: '暂无赛事',
				2: '暂无视频',
				3: '暂无证书'
			};
			return titleMap[activated];
		},
		emptyType() {
			let { activated } = this;
			let titleMap = {
				1: 1,
				2: 2,
				3: 3
			};
			return titleMap[activated];
		}
	},
	onLoad() {
		this.getMyEvent();
		this.getVideoList();
		this.getCertList();
	},
	onPullDownRefresh() {
		this.getMyEvent();
		this.getVideoList();
		this.getCertList();
		uni.stopPullDownRefresh();
	},
	onShow() {
		const app = getApp();
		let { userInfo } = app.globalData;
		this.avatar_url = userInfo.avatar_url !== '' ? userInfo.avatar_url : this.default_img;
		this.nick_name = userInfo.nick_name !== '' ? userInfo.nick_name : '登录与注册';
		this.is_auth = userInfo.is_auth;
		this.phone = userInfo.phone.slice(0, 3) + '****' + userInfo.phone.slice(7, 11);
		if (app.globalData.mineRefresh) {
			this.getMyEvent();
			this.getVideoList();
			this.getCertList();
			app.globalData.mineRefresh = false;
		}
		this.getUserInfo();
	},
	methods: {
		changeTab(item) {
			this.activated = item.id;
		},
		// 我的赛事
		async getMyEvent() {
			let res = await getMyMatchActivity();
			if (res.code === 200) {
				this.raceList = res.data;
			}
		},
		// 参赛视频
		async getVideoList() {
			let res = await getMyVideoList();
			if (res.code === 200) {
				this.matchVedioList = res.data.video_list;
			}
		},
		// 我的证书
		async getCertList() {
			let res = await getMyCertList();
			if (res.code === 200) {
				this.diplomaList = res.data;
			}
		},
		handleUpdate() {
			this.getMyEvent();
			this.getVideoList();
			this.getCertList();
		},
		handleSetting() {
			uni.navigateTo({
				url: '/pages/setting/index'
			});
		},
		getUserInfo() {
			getWxMember({}).then((res) => {
				if (res.code === 200) {
					let app = getApp();
					let userInfo = {
						phone: res.data.phone,
						nick_name: res.data.nick_name,
						name: res.data.name,
						avatar_url: res.data.avatar_url,
						is_auth: res.data.is_authenticate
					};
					this.avatar_url = userInfo.avatar_url !== '' ? userInfo.avatar_url : this.default_img;
					this.nick_name = userInfo.nick_name !== '' ? userInfo.nick_name : '登录与注册';
					this.is_auth = userInfo.is_auth;
					this.phone = userInfo.phone.slice(0, 3) + '****' + userInfo.phone.slice(7, 11);
					app.globalData.isAuth = res.data.is_authenticate === -1 ? false : true;
					app.globalData.business_id = res.data.business_id;
					app.globalData.userInfo = userInfo;
					app.globalData.is_login = true;
					if (res.data.is_authenticate === -1) {
						this.toLogin();
					}
				} else {
					wx.showToast({
						title: res.message,
						icon: 'error'
					});
				}
			});
		},
		toLogin() {
			uni.reLaunch({
				url: '/pages/login/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.mine-container {
	min-height: 100vh;
	box-sizing: border-box;
	background-color: #f7f8fa;
}
.header-box {
	width: 100%;
	height: 424rpx;
	border-radius: 0 0 0 92rpx;
	background: linear-gradient(138.23deg, rgba(249, 78, 71, 1) 0%, rgba(240, 57, 44, 1) 100%);
	position: relative;
	overflow: hidden;

	.header-box-main {
		position: relative;
		z-index: 10;
		height: 100%;
	}

	.box1 {
		position: absolute;
		left: 40rpx;
		bottom: 40rpx;
		display: block;
		width: 882rpx;
		height: 596rpx;
		z-index: 0;
	}
}

.line-1 {
	display: flex;
	align-items: center;
	padding: 24rpx 48rpx;
	.avatar-box {
		flex-shrink: 0;
		width: 112rpx;
		height: 112rpx;
		border-radius: 112rpx;
		border: 4rpx solid #fcb6b3;
		overflow: hidden;
		.avatar {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	.name {
		font-size: 48rpx;
		font-weight: 600;
		color: #fff;
		flex: 1;
		padding-left: 32rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.setting {
		flex-shrink: 0;
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
		color: #fff;
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

.list-container {
	padding: 40rpx 24rpx;
	box-sizing: border-box;
	.list-item {
		margin-bottom: 24rpx;
	}
}
</style>
