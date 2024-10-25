<template>
	<view class="mine-container">
		<view class="header-box">
			<image src="../../static/imgs/apply_bg.png" class="box1" mode=""></image>
			<NavBar :nav-color="primaryColor" show-back></NavBar>
			<view class="title">
				<text>填写报名表单体验</text>
				<text class="middle">运动生活</text>
				<text>吧</text>
			</view>
		</view>
		<view class="main-container">
			<view class="common-title group-title">参赛方式</view>
			<view class="common-line group-box">
				<view :class="['item-group', { activated: type === 1 }]" @click="type = 1">
					<image src="../../static/imgs/apply_personal.png" class="personal-image" mode=""></image>
					<view class="title">个人参赛</view>
					<view class="checked" v-if="type === 1">
						<uni-icons type="checkmarkempty" color="#fff" size="14"></uni-icons>
					</view>
				</view>
				<view :class="['item-group', { activated: type === 2 }]" @click="type = 2">
					<image src="../../static/imgs/apply_group.png" class="group-image" mode=""></image>
					<view class="title">团队参赛</view>
					<view class="checked" v-if="type === 2">
						<uni-icons type="checkmarkempty" color="#fff" size="14"></uni-icons>
					</view>
				</view>
			</view>
			<view v-if="type == 2">
				<view class="common-title">{{ type == 1 ? '参赛昵称' : '团队名' }}</view>
				<view class="common-line input-line">
					<input type="text" v-model.trim="nick_name" class="input" :placeholder="type == 1 ? '请输入参赛昵称' : '请输入团队名'" />
				</view>
			</view>
			<view class="common-title">
				参赛人姓名
				<text class="tip" v-if="type == 2">团队只写领队</text>
			</view>
			<view class="common-line input-line">
				<input type="text" v-model.trim="name" class="input" placeholder="请输入参赛人姓名" />
			</view>
			<view class="common-title">
				参赛人身份证号
				<text class="tip" v-if="type == 2">团队只写领队</text>
			</view>
			<view class="common-line input-line">
				<input type="text" class="input" v-model.trim="id_card" placeholder="请输入参赛人身份证号" />
			</view>
			<view class="common-title">手机号</view>
			<view class="common-line input-line">
				<input type="number" class="input" v-model.trim="phone" placeholder="请输入参赛人手机号" />
				<button class="button" @click="getPhone">获取授权</button>
			</view>
		</view>
		<BottomButton @submit="handleSubmit" />
	</view>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import BottomButton from '@/components/BottomButton.vue';
import { testIdCard, testMobile } from '@/utils/util.js';
import { applyMatch } from '@/apis/index.js';
export default {
	components: {
		NavBar,
		BottomButton
	},
	data() {
		return {
			primaryColor: 'transparent',
			type: 1,
			nick_name: '',
			name: '',
			id_card: '',
			phone: '',
			match_activity_id: '',
			loading: false,
			showPhoneBtn: false
		};
	},
	onLoad(options) {
		let { match_activity_id } = options;
		this.match_activity_id = match_activity_id;
		let app = getApp();
		let phone = app.globalData.userInfo.phone;
		if (phone) {
			this.showPhoneBtn = true;
		}
	},
	methods: {
		getPhone() {
			let app = getApp();
			this.phone = app.globalData.userInfo.phone;
			this.$public.showToast('获取成功');
		},
		handleSubmit() {
			let obj = {
				type: this.type,
				nick_name: this.nick_name,
				name: this.name,
				id_card: this.id_card,
				phone: this.phone,
				match_activity_id: this.match_activity_id
			};
			let flag = this.validateForm(obj);
			if (this.loading) {
				return;
			}
			if (flag) {
				this.loading = true;
				this.submitForm(obj);
			}
		},
		validateForm(obj) {
			let { type, nick_name, name, id_card, phone } = obj;
			if (!type) {
				this.$public.showToast('请选择参赛方式', 1000);
				return false;
			}
			if (type == 2 && !nick_name) {
				this.$public.showToast('请填写参赛昵称/团队名', 1000);
				return false;
			}
			if (nick_name && nick_name.length > 30) {
				this.$public.showToast('参赛昵称/团队名长度应小于30', 1000);
				return false;
			}
			if (!name) {
				this.$public.showToast('请填写参赛人姓名', 1000);
				return false;
			}
			if (name && name.length > 10) {
				this.$public.showToast('参赛昵称/团队名长度应小于10', 1000);
				return false;
			}

			if (!testIdCard(id_card)) {
				this.$public.showToast('请输入正确的身份证号', 1000);
				return false;
			}

			if (!testMobile(phone)) {
				this.$public.showToast('请输入正确的手机号', 1000);
				return false;
			}
			return true;
		},
		async submitForm(obj) {
			let res = await applyMatch(obj);
			getApp().globalData.mineRefresh = true;
			if (res.code !== 200) {
				this.$public.showToast(res.message);
			} else {
				uni.redirectTo({
					url: '/pages/applyResult/index'
				});
			}

			this.loading = false;
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
		left: 0;
		bottom: 0;
		display: block;
		width: 100%;
		height: 100%;
		z-index: 0;
	}
	.title {
		position: relative;

		width: 450rpx;
		font-family: 'YouSheBiaoTiHei';
		font-size: 64rpx;
		font-weight: 400;
		color: rgba(255, 243, 192, 1);
		text-align: center;
		margin: 0 auto;
		.middle {
			color: #f7f8fa;
		}
	}
}
.main-container {
	padding: 0 32rpx;
	padding-bottom: 250rpx;
	.common-title {
		color: $pp-text-color;
		font-weight: 500;
		font-size: 28rpx;
		margin-bottom: 24rpx;
		margin-top: 48rpx;
		&.group-title {
			margin-bottom: 52rpx;
		}
		.tip {
			color: #c8c9cc;
			font-size: 24rpx;
			padding-left: 16rpx;
		}
	}

	.common-line {
		width: 100%;
		height: 112rpx;
		&.input-line {
			background-color: #fff;
			box-sizing: border-box;
			padding: 0 32rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.input {
				flex: 1;
				color: $pp-text-color;
			}
		}
		.button {
			flex-shrink: 0;
			min-width: 172rpx;
			height: 64rpx;
			padding: 0;
			margin: 0;
			margin-left: 24rpx;
			background: red;
			font-size: 28rpx;
			color: $pp-color-primary;
			background-color: #fff;
			border-radius: 64rpx;
			border: 2rpx solid $pp-color-primary;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.group-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.item-group {
			width: 330rpx;
			height: 100%;
			box-sizing: border-box;
			border-radius: 16rpx;
			border: 1rpx solid #ebedf0;
			position: relative;
		}
		.personal-image {
			display: block;
			position: absolute;
			width: 142rpx;
			height: 126rpx;
			bottom: 0;
			left: 0;
		}
		.group-image {
			display: block;
			position: absolute;
			width: 170rpx;
			height: 150rpx;
			bottom: 0;
			left: 0;
		}
		.title {
			position: absolute;
			z-index: 10;
			right: 54rpx;
			top: 50%;
			transform: translateY(-50%);
			color: $pp-text-color;
			font-size: 24rpx;
			font-weight: 500;
		}
		.checked {
			position: absolute;
			z-index: 11;
			top: 0;
			right: 0;
			width: 40rpx;
			height: 32rpx;
			background-color: $pp-color-primary;
			border-radius: 0 16rpx 0 16rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		& > .activated {
			background: linear-gradient(223.75deg, #ffbaba 0%, #fffcfa 100%);
		}
	}
}
</style>
