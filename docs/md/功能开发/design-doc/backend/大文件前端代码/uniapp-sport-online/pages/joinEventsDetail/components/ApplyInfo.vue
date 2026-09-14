<template>
	<view class="apply-info-container">
		<image v-if="applyInfo.type == 2" class="right" src="../../../static/imgs/apply_group.png"></image>
		<image v-else class="right" src="../../../static/imgs/apply_personal.png"></image>
		<view class="app-wrap">
			<view class="apply-header">
				<image class="left" src="../../../static/imgs/play-info-head.png"></image>
				<!-- applyInfo.type == 2 ? '团队参赛' : '个人参赛' -->
				<view class="title"> {{ applyInfo.type_str }} </view>
			</view>
			<CellItem v-if="applyInfo.type == 2" label="团队名称" :value="applyInfo.nick_name" border />
			<CellItem label="参赛人姓名" :value="applyInfo.name" border />
			<CellItem label="身份证号" :value="applyInfo.id_card" border />
			<CellItem label="手机号" :value="applyInfo.phone" />
		</view>
	</view>
</template>

<script>
import CellItem from '@/components/CellItem.vue'
export default {
	components: { CellItem },
	props: {
		isTeam: {
			type: Boolean,
			default: true
		},
		applyInfo: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {}
	}
}
</script>

<style lang="scss" scoped>
.apply-info-container {
	position: relative;
	margin-top: 90rpx;
	.right {
		position: absolute;
		right: 34rpx;
		top: 0;
		transform: translateY(-55%);
		width: 170rpx;
		height: 150rpx;
	}
	.app-wrap {
		border-radius: 30rpx;
		overflow: hidden;
		border: 1px solid $pp-color-primary;
		.apply-header {
			position: relative;
			height: 74rpx;
			.left {
				position: absolute;
				left: 0;
				top: 0;
				width: 234rpx;
				height: 74rpx;
			}
			.title {
				position: absolute;
				font-style: italic;
				top: 4rpx;
				left: 56rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #fff;
			}
		}
	}
}
</style>
