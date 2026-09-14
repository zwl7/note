<template>
	<view class="inform-pop-container">
		<uni-popup ref="popup" type="bottom">
			<view class="popup-container">
				<button @click="informOpen">举报</button>
				<button @click="clear">取消</button>
			</view>
		</uni-popup>

		<uni-popup ref="inform" type="center" class="inform-pop">
			<view class="inform-container">
				<view class="i-title">举报</view>
				<radio-group @change="radioChange">
					<label class="radio-list" v-for="(item, index) in items" :key="item.value">
						<radio :value="item.value" color="#f5463c" :checked="index === current" />
						<view>{{ item.name }}</view>
					</label>
				</radio-group>
				<button @click="confirmInform">确认举报</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	name: 'InformPop',
	props: {},
	data() {
		return {
			items: [
				{
					value: 0,
					name: '广告营销'
				},
				{
					value: 1,
					name: '色情低俗'
				},
				{
					value: 2,
					name: '存在欺骗行为'
				},
				{
					value: 3,
					name: '带有敏感政治信息'
				},
				{
					value: 4,
					name: '存在侵权行为'
				},
				{
					value: 5,
					name: '其他'
				}
			],
			current: 0
		};
	},
	methods: {
		open(item) {
			console.log(item, '取消');
			this.$refs.popup.open();
		},
		clear() {
			this.$refs.popup.close();
		},
		informOpen() {
			this.$refs.popup.close();
			this.$emit('confirm');
		},
		confirmInform() {
			this.$refs.inform.close();
		},
		radioChange(e) {
			console.log(e.detail.value, '举报');
		}
	}
};
</script>

<style lang="scss" scoped>
.inform-pop-container {
	.popup-container {
		display: flex;
		justify-content: space-between;
		button {
			flex: 1;
			border-radius: 0;
			padding: 10rpx 0;
			color: #fff;
			font-size: 28rpx;
			background-color: rgba(0, 0, 0, 0.6);
			&:last-child {
				border-left: 1px solid #ccc;
			}
		}
	}
	.inform-container {
		position: fixed;
		top: 20%;
		left: 50%;
		width: calc(100vw - 200rpx);
		transform: translateX(-50%);
		padding: 32rpx;
		border-radius: 32rpx;
		background-color: #fff;
		.i-title {
			font-size: 32rpx;
			text-align: center;
			font-weight: 500;
			padding-bottom: 30rpx;
		}
		.radio-list {
			display: flex;
			margin-bottom: 30rpx;
			font-size: 28rpx;
			view {
				padding-left: 20rpx;
			}
			&:last-child {
				margin-bottom: 50rpx;
			}
		}
		button {
			border-radius: 200rpx;
			font-size: 28rpx;
			color: #fff;
			background-color: $pp-color-primary;
		}
	}
}
</style>
