<template>
	<view class="feedback-container">
		<view class="tab-box">
			<view v-for="(item, index) in typeList" :key="index" :class="['item', { activated: activated === item.id }]" @click="changeTab(item)">
				<text>
					{{ item.title }}
				</text>
				<uni-icons custom-prefix="iconfont" type="icon-tabline" color="#f5463c" size="5" v-if="activated === item.id" class="iconfont"></uni-icons>
			</view>
		</view>
		<view v-if="activated == 1" class="feedback-edit">
			<view class="remark">
				<textarea v-model="des" :maxlength="100" placeholder-style="color:#B5B5B5;font-size:28rpx" auto-height placeholder="请输入回复内容" class="textarea" />
				<view class="remark-count">{{ des.length }}/100</view>
			</view>
			<view class="submit-bth" @click="submit">提交</view>
		</view>
		<view v-else class="record-container">
			<scroll-view scroll-y="true">
				<view v-for="(item, index) in list" :key="index" class="r-item">
					<text class="c-time">{{ item.c_time }}</text>
					<text class="c-text">{{ item.des }}</text>
				</view>
			</scroll-view>
			<Empty title="暂无数据" type="1" v-if="list.length == 0" />
		</view>
	</view>
</template>

<script>
import Empty from '@/components/Empty.vue';
import { addFeedback, getFeedbackList } from '@/apis/common.js';
import listMixins from '@/core/listMixins.js';
export default {
	components: {
		Empty
	},
	mixins: [listMixins],
	data() {
		return {
			des: '',
			activated: 1,
			typeList: [
				{ id: 1, title: '反馈信息' },
				{ id: 2, title: '反馈记录' }
			],
			page: 1,
			size: 10,
			submitLoading: false,
			list: []
		};
	},
	methods: {
		changeTab(item) {
			const { id, title } = item;
			this.activated = id;
		},
		submit() {
			if (this.submitLoading) {
				return;
			}
			if (this.des.length < 10) {
				this.$public.showToast('最少输入十个字');
				return;
			}
			this.submitLoading = true;
			addFeedback({ des: this.des }).then((res) => {
				if (res.code === 200) {
					uni.showToast({
						title: '提交成功',
						icon: 'success'
					});
					this.des = '';
					this.refresh();
				} else {
					this.$public.showToast(res.message);
				}
				this.submitLoading = false;
			});
		},

		async getList(refresh) {
			const param = {
				page: this.page,
				size: this.size
			};

			this.loading = true;
			let res = await getFeedbackList(param);
			let _this = this;
			if (res.code === 200) {
				this.list = this.list.concat(res.data.list);
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
		refresh() {
			this.page = 1;
			this.list = [];
			this.$nextTick(() => {
				this.getList(true);
			});
		}
	},

	onReachBottom() {
		this.loadMore();
	},
	onPullDownRefresh() {
		this.refresh();
	},
	onLoad() {
		this.getList();
	}
};
</script>

<style lang="scss" scoped>
.feedback-container {
	min-height: 100vh;
	background-color: #fff;

	.feedback-edit {
		.remark {
			position: relative;
			margin: 40rpx 32rpx;
			padding: 32rpx 32rpx 60rpx;
			background-color: #fafafc;
			border-radius: 24rpx;
			.textarea {
				min-height: 260rpx;
				width: 100%;
			}
			.remark-count {
				position: absolute;
				bottom: 24rpx;
				right: 32rpx;
				color: #b5b5b5;
				font-size: 24rpx;
			}
		}
		.fast-text {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding-right: 32rpx;
			color: #f4443a;
			font-size: 24rpx;
			text {
				margin-left: 8rpx;
			}
		}
		.submit-bth {
			margin: 56rpx auto 0;
			width: calc(100% - 32rpx);
			border-radius: 200rpx;
			color: #fff;
			font-size: 30rpx;
			text-align: center;
			padding: 20rpx 0;
			background: linear-gradient(138.27deg, #f94e47 0%, #f0392c 100%);
		}
	}

	.record-container {
		padding: 40rpx 32rpx;
		.r-item {
			display: flex;
			flex-direction: column;
			width: 100%;
			padding: 40rpx 44rpx 28rpx 32rpx;
			background-color: #f5f8fc;
			border-radius: 24rpx;
			margin-bottom: 24rpx;
			color: #646566;
			font-size: 28rpx;
			.c-time {
				font-size: 24rpx;
				color: #999;
				padding-bottom: 20rpx;
			}
		}
	}
}

// tab
.tab-box {
	position: sticky;
	top: 0%;
	left: 0;
	right: 0;
	width: 100%;
	height: 88rpx;
	z-index: 10;
	display: flex;
	align-items: center;
	background-color: #fff;
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
