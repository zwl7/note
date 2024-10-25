<template>
	<view class="setting-container">
		<CellItem label="账号与安全" :isTitle="true"></CellItem>
		<CellItem label="编辑个人信息" link border @click.native="handleClick(6)"></CellItem>
		<!-- 已认证 -->
		<CellItem label="实名认证" :link="is_auth != 1" :value="is_auth == 1 ? '已认证' : ''" @click.native="handleClick(5)"></CellItem>
		<CellItem label="服务与建议" :isTitle="true"></CellItem>
		<CellItem label="意见反馈" link border @click.native="handleClick(1)"></CellItem>
		<CellItem label="隐私政策" link border @click="handleClick(3)"></CellItem>
		<CellItem label="用户服务协议" link @click="handleClick(2)"></CellItem>
		<CellItem label="关于我们" :isTitle="true"></CellItem>
		<CellItem label="关于我们" link border @click="handleClick(4)"></CellItem>
		<CellItem label="当前版本" value="1.0.1"></CellItem>
	</view>
</template>

<script>
import CellItem from '@/components/CellItem.vue';
export default {
	components: {
		CellItem
	},
	data() {
		return {
			is_auth: 0 //是否认证 0 未认证  1 审核中  2 已认证
		};
	},
	onLoad() {
		console.log(getApp().globalData.userInfo);
		this.is_auth = getApp().globalData.userInfo.is_auth;
	},
	onShow() {
		this.is_auth = getApp().globalData.userInfo.is_auth;
	},
	methods: {
		handleClick(type) {
			switch (type) {
				case 1:
					uni.navigateTo({
						url: '/pages/feedback/index'
					});
					break;
				case 2:
					uni.navigateTo({
						url: '/pages/serviceAgreement/index'
					});
					break;
				case 3:
					uni.navigateTo({
						url: '/pages/privacyAgreement/index'
					});
					break;
				case 4:
					uni.navigateTo({
						url: '/pages/aboutUs/aboutUs'
					});
					break;
				case 5:
					if (this.is_auth != 1) {
						uni.navigateTo({
							url: '/pages/authentication/index'
						});
					}
					break;
				case 6:
					uni.navigateTo({
						url: '/pages/userInfo/index'
					});
					break;
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
