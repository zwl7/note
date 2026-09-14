<template>
	<view class="certificate-container">
		<view class="common-line">
			<uni-icons custom-prefix="iconfont" type="icon-user" color="#000" size="20"></uni-icons>
			<input v-model="member_name" type="text" placeholder-style="color:#B0B1B2;font-size:28rpx" placeholder="请输入姓名" />
		</view>
		<view class="common-line">
			<uni-icons custom-prefix="iconfont" type="icon-phone" color="#000" size="20"></uni-icons>
			<input v-model="phone" type="text" placeholder-style="color:#B0B1B2;font-size:28rpx" placeholder="请输入手机号" />
		</view>
		<view class="common-line no-border">
			<uni-icons custom-prefix="iconfont" type="icon-edit" color="#000" size="20"></uni-icons>
			<view class="input-text-right" @click="showPopup">
				<view :class="['text', project_name ? '' : 'active']">{{ project_name ? project_name : '选择项目' }}</view>
				<uni-icons type="right" size="18" color="#969799"></uni-icons>
			</view>
		</view>
		<button class="submit" :loading="loading" :disabled="loading" @click="submit">确定</button>
		<view class="check-certificate" @click="handel">查看领取过的证书</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup-container">
				<view class="certificate-list">
					<view v-for="item in projectList" :key="item.project_id" @click="handelProject(item)" class="c-item ellipsis">
						{{ item.name }}
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import SelectProject from '@/components/Select/index.vue';
import { getOtherCert } from '@/apis/mine.js';
import { getProject } from '@/apis/index.js';
import { testMobile } from '@/utils/util.js';
export default {
	components: {
		SelectProject
	},
	data() {
		return {
			show: false,
			member_name: '',
			phone: '',
			project_id: '',
			loading: false,
			project_name: '',
			projectList: [],
			list: [
				{
					value: '1',
					label: '篮球比赛'
				},
				{
					value: '2',
					label: '足球比赛'
				}
			]
		};
	},
	mounted() {
		this.getProject();
	},
	methods: {
		showPopup() {
			this.$refs.popup.open();
		},
		async submit() {
			const { member_name, phone, project_id } = this;
			if (!member_name) {
				this.$public.showToast('姓名不能为空', 1000);
				return;
			}
			if (!phone) {
				this.$public.showToast('手机号不能为空', 1000);
				return;
			}
			if (!project_id) {
				this.$public.showToast('请选择项目', 1000);
				return;
			}
			if (!testMobile(phone)) {
				this.$public.showToast('手机号格式不正确', 1000);
				return;
			}

			const params = {
				member_name,
				phone,
				project_id
			};
			this.loading = true;
			// 查询非本平台颁发的证书详情
			try {
				const result = await getOtherCert(params);
				if (result.code !== 200) {
					this.$public.showToast(result.message, 1000);
				} else {
					this.$public.showToast('领取成功', 1000);
					getApp().globalData.mineRefresh = true;
					uni.switchTab({
						url: `/pages/tabbar/mine/index`
					});
				}
				this.loading = false;
			} catch (e) {
				this.loading = false;
			}
		},
		handel() {
			uni.switchTab({
				url: `/pages/tabbar/mine/index`
			});
		},
		async getProject() {
			const { data } = await getProject({ type: 1 });
			this.projectList = data;
		},
		//  选择项目
		handelProject(item) {
			const { project_id, name } = item;
			this.project_name = name;
			this.project_id = project_id;
			this.$refs.popup.close();
		}
	}
};
</script>

<style lang="scss" scoped>
.certificate-container {
	padding-top: 52rpx;
	font-size: 28rpx;
	min-height: 100vh;
	background-color: #fff;
	.common-line {
		border-bottom: 1px solid #e5e5e5;
		display: flex;
		align-items: center;
		width: calc(100% - 48rpx);
		padding: 32rpx 0 40rpx;
		margin: 0 auto;
		&.no-border {
			border: none;
		}
		input,
		.text {
			margin-left: 32rpx;
			&.active {
				color: #b0b1b2;
			}
		}
		.input-text-right {
			display: flex;
			flex: 1;
			justify-content: space-between;
		}
	}
	.submit {
		width: calc(100% - 32rpx);
		color: #fff;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 200rpx;
		font-size: 28rpx;
		text-align: center;
		margin: 72rpx auto 50rpx;
		background: linear-gradient(138.27deg, #f94e47 0%, #f0392c 100%);
	}
	.check-certificate {
		text-align: center;
		color: #f4443a;
	}
}
// uni-popup
.popup-container {
	background-color: #fff;
	border-radius: 40rpx 40rpx 0 0;
	padding: 52rpx 0 52rpx 48rpx;
	min-height: 400rpx;
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
}
</style>
