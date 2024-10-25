<template>
	<view class="fitness-guide-container">
		<SelectTab v-model:value="type" :project="project" @confirm="onConfoirm"></SelectTab>
		<view v-if="list.length > 0" class="list-container">
			<VideoList :list="list" />
		</view>
		<Empty v-else title="暂无数据" />
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
import listMixins from '@/core/listMixins.js';
import SelectTab from '@/components/SelectTab.vue';
import VideoList from '@/components/VideoList.vue';
import Empty from '@/components/Empty.vue';
import { getProject, getIndexVideoList } from '@/apis/index.js';
export default {
	mixins: [listMixins],
	components: {
		SelectTab,
		VideoList,
		Empty
	},
	data() {
		return {
			type: 1,
			project_id: '',
			project: []
		};
	},
	onReachBottom() {
		this.loadMore();
	},
	onPullDownRefresh() {
		this.page = 1;
		this.list = [];
		this.$nextTick(() => {
			this.getList(true);
		});
	},
	onLoad() {
		this.getProjectList();
		this.getList();
	},
	methods: {
		async getProjectList() {
			let res = await getProject({
				type: 2
			});
			if (res.code === 200) {
				let project = [
					{
						name: '全部',
						project_id: ''
					}
				];
				this.project = project.concat(res.data);
			}
		},

		async getList(refresh) {
			const param = {
				page: this.page,
				size: 10,
				order_by: this.type
			};
			if (this.project_id) {
				param.project_id = this.project_id;
			}
			if (!param.order_by) {
				delete param.order_by;
			}
			this.loading = true;
			let res = await getIndexVideoList(param);
			let _this = this;
			if (res.code === 200) {
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
							_this.loadMore();
						}
					});
				}
				if (refresh) {
					uni.stopPullDownRefresh();
				}
			} else {
				this.$public.showToast(res.message);
			}
		},
		onConfoirm(e) {
			this.project_id = e.project_id;
			this.type = e.type;
			this.page = 1;
			this.list = [];
			this.$nextTick(() => {
				this.getList(true);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.fitness-guide-container {
	padding: 32rpx;
	.list-container {
		margin-top: 48rpx;
	}
}
</style>
