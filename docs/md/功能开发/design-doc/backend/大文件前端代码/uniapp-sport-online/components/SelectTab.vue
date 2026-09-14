<template>
	<view class="selecttab-container">
		<view class="item status1" @click="showPopup">
			<text class="all_title">{{ projectName }}</text>
			<uni-icons custom-prefix="iconfont" class="icon" type="icon-xiajiantou" color="#fff" size="8"></uni-icons>
		</view>
		<!-- <view :class="['item', { status2: value == 1 }]" @click="handleClick(1)">综合排序</view> -->
		<view :class="['item', { status2: type == 1 }]" @click="handleClick(1)">最新</view>
		<view :class="['item', { status2: type == 2 }]" @click="handleClick(2)">最热</view>
	</view>
	<uni-popup ref="popup" type="bottom">
		<view class="popup-container">
			<view class="certificate-list">
				<view v-for="(item, index) in project" :key="index" :class="['c-item', 'ellipsis', { activated: item.project_id == projectId }]" @click="handleSelect(item)">
					{{ item.name }}
				</view>
			</view>
		</view>
	</uni-popup>
</template>
<script>
export default {
	props: {
		value: {
			type: [Number, String],
			default: 1
		},
		project: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	components: {},
	data() {
		return {
			type: '',
			projectId: '',
			projectName: '全部'
		};
	},
	methods: {
		handleClick(type) {
			this.type = type;
			// this.$emit('update:value', type);
			this.confirm();
		},
		handleSelect(item) {
			if (this.projectId != item.project_id) {
				this.projectId = item.project_id;
				this.projectName = item.name;
			} else {
				this.projectId = '';
				this.projectName = '全部';
			}
			this.confirm();
			this.$refs.popup.close();
		},
		confirm() {
			let obj = {
				project_id: this.projectId,
				type: this.type
			};
			this.$emit('confirm', obj);
		},
		showPopup() {
			this.$refs.popup.open();
		}
	}
};
</script>
<style lang="scss" scoped>
.selecttab-container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.item {
		width: 214rpx;
		height: 56rpx;
		border-radius: 56rpx;
		background-color: #f8f9fb;
		border: 2rpx solid #efefef;
		box-sizing: border-box;
		font-size: 28rpx;
		font-weight: 400;
		color: #646566;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 16rpx;

		.all_title {
			margin-right: 10rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.status1 {
		background-color: $pp-color-primary;
		border: 2rpx solid $pp-color-primary;
		color: #fff;
		.icon {
			position: relative;
			top: -4rpx;
		}
	}
	.status2 {
		background-color: #ffedec;
		border: 2rpx solid #ffedec;
		color: $pp-color-primary;
	}
}
.popup-container {
	background-color: #fff;
	border-radius: 40rpx 40rpx 0 0;
	padding: 52rpx 0 52rpx 48rpx;
	max-height: 50vh !important;
	min-height: 400rpx;
	overflow: auto;
}
.certificate-list {
	display: flex;
	flex-wrap: wrap;
	.c-item {
		border: 1px solid #dcdee0;
		color: #646566;
		font-size: 28rpx;
		padding: 0 40rpx;
		width: 200rpx;
		height: 56rpx;
		text-align: center;
		margin: 0 26rpx 26rpx 0;
		line-height: 56rpx;
		border-radius: 100rpx;
	}
	.activated {
		background-color: #ffedec;
		border: 2rpx solid #ffedec;
		color: $pp-color-primary;
	}
}
</style>
