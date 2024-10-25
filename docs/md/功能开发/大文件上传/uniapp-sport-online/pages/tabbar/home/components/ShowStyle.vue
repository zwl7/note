<template>
	<view class="show-style-container">
		<CommonTitle title="风采展示" />
		<UScrollList :indicator="count > 10">
			<view class="scroll-list">
				<view class="scroll-list__line" v-for="(item, index) in list" :key="index" :class="[index != 0 && 'scroll-list__margin-top']">
					<view
						class="scroll-list__line__item"
						v-for="(item1, index1) in item"
						:key="index1"
						@click="clickItem(item1)"
						:class="[index1 === item.length - 1 && 'scroll-list__line__item--no-margin-right']"
					>
						<image class="item__image" :src="item1.images" mode=""></image>
						<text class="item__text">{{ item1.name }}</text>
					</view>
				</view>
			</view>
		</UScrollList>
	</view>
</template>
<script>
import CommonTitle from './CommonTitle.vue'
import UScrollList from '@/components/ScrollList/u-scroll-list.vue'
export default {
	components: {
		CommonTitle,
		UScrollList
	},
	props: {
		list: {
			type: Array,
			default: () => {
				return []
			}
		},
		count: {
			type: Number
		}
	},
	data() {
		return {}
	},

	methods: {
		clickItem(item) {
			this.$emit('click', item)
		}
	}
}
</script>
<style lang="scss" scoped>
.show-style-container {
	padding: 0 32rpx;
	margin-top: 44rpx;
}

.scroll-list__margin-top {
	margin-top: 32rpx;
}
.scroll-list {
	display: flex;
	flex-direction: column;

	&__line {
		display: flex;
		flex-direction: row;

		&__item {
			margin-right: 28rpx;
			height: 152rpx;
			width: 116rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			&--no-margin-right {
				margin-right: 0;
			}
		}
	}
}
.item__image {
	display: block;
	width: 86rpx;
	height: 86rpx;
}
.item__text {
	font-size: 26rpx;
	font-weight: 400;
	color: $pp-text-color;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
