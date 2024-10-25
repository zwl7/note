<template>
	<view class="produciton-container">
		<view class="recommend-vedio-title">
			<CommonTitle title="参赛作品" :showMore="true" @more="toFitnessGuide" />
		</view>
		<view class="select-tab-box" :style="headerStyle">
			<SelectTab v-model:value="type" :project="projectList" @confirm="onConfoirm"></SelectTab>
		</view>
		<view v-if="list.length > 0" class="list-container">
			<VideoList :list="list" />
		</view>
		<Empty v-if="list.length === 0" title="暂无数据" />
	</view>
</template>
<script>
import CommonTitle from './CommonTitle.vue';
import SelectTab from '@/components/SelectTab.vue';
import VideoList from '@/components/VideoList.vue';
import Empty from '@/components/Empty.vue';
export default {
	props: {
		list: {
			type: Array,
			default: () => {
				return [];
			}
		},
		project: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	components: {
		CommonTitle,
		SelectTab,
		VideoList,
		Empty
	},
	computed: {
		projectList() {
			let list = [
				{
					name: '全部',
					project_id: ''
				}
			];
			return list.concat(this.project);
		}
	},
	data() {
		return {
			type: '1',
			headerStyle: {}
		};
	},
	created() {
		const app = getApp();
		let { navBarHeight } = app.globalData;
		this.headerStyle = {
			top: `${navBarHeight * 2}rpx`
		};
	},
	methods: {
		onConfoirm(e) {
			this.$emit('confirm', e);
		},
		toFitnessGuide() {
			uni.navigateTo({
				url: '/pages/productionList/index'
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.produciton-container {
	margin-top: 40rpx;
}
.list-container {
	padding: 0 32rpx;
	width: 100%;
	margin-top: 20rpx;
}
.recommend-vedio-title {
	padding: 0 32rpx;
}
.select-tab-box {
	padding: 16rpx 32rpx;
	position: sticky;
	width: 100%;
	z-index: 90;
	background-color: #f8f9fb;
}
</style>
