<template>
	<view class="container">
		<rich-text :nodes="des"></rich-text>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type: 2,
			des: `<p style="text-align: center; line-height: 1.5;"><br></p><p style="line-height: 1.5;"><span style="font-size: 14px;">"全民健身线上赛"（以下称为"我们"）为了保护用户（以下称为 "您"）的个人隐私，特此制定以下隐私协议。</span></p><p style="line-height: 1.5;"><span style="font-size: 14px;">请您仔细阅读并确保完全理解。</span></p><p style="line-height: 1.5;"><span style="font-size: 14px;">1.隐私保护原则</span></p><p style="line-height: 1.5;"><span style="font-size: 14px;">我们高度重视您的个人隐私，将采取合理措施保护您的个人信息不被泄露、滥用等。本协议详细说明了我们在收集、使用、存储和传输您个人信息方面的规则和措施。</span></p><p style="text-indent: 2em; line-height: 1.5;"><br></p><p style="line-height: 1.5;"><span style="font-size: 14px;">2.信息收集范围</span></p><p style="line-height: 1.5;"><span style="font-size: 14px;">本应用有可能需要您提供姓名、性别、电话、身份证件号等个人真实资料进行实名认证，如果您提供的个人资料不完整、不真实则有可能导致您无法使用该应用。</span></p><p style="text-indent: 2em; line-height: 1.5;"><br></p><p style="line-height: 1.5;"><span style="font-size: 14px;">3.信息使用规则</span></p><ul><li style="line-height: 1.5;"><span style="font-size: 14px;">我们仅在以下必要的情况下使用您的个人信息:</span></li><li style="line-height: 1.5;"><span style="font-size: 14px;">为您提供个性化服务完善用户体验，如分析用户行为等;</span></li><li style="line-height: 1.5;"><span style="font-size: 14px;">遵守相关法律法规，如监管要求、法律诉讼等。</span></li></ul><p style="text-indent: 2em; line-height: 1.5;"><br></p><p style="line-height: 1.5;"><span style="font-size: 14px;">4.信息保护措施</span></p><ul><li style="line-height: 1.5;"><span style="font-size: 14px;">我们采取以下措施保护您的个人信息:</span></li><li style="line-height: 1.5;"><span style="font-size: 14px;">数据加密:您的个人信息在传输和存储过程中将进行加密处理，确保数据安全;</span></li><li style="line-height: 1.5;"><span style="font-size: 14px;">访问控制:只有经过授权的员工才能访问您的个人信息并严格限制访问权限;</span></li><li style="line-height: 1.5;"><span style="font-size: 14px;">数据备份:我们定期备份您的个人信息，确保数据不会因意外而丢失。</span></li></ul><p style="text-indent: 2em; line-height: 1.5;"><br></p><p style="line-height: 1.5;"><span style="font-size: 14px;">5.第三方链接和广告</span></p><p style="line-height: 1.5;"><span style="font-size: 14px;">我们可能会在服务中链接到第三方网站或广告。我们会尽力确保这些链接和广告符合我们的隐私保护标准。如果您点击链接或广告，我们可能会收集您的浏览和购买信息。我们会将此类信息用于统计和分析，以了解您的使用情况。</span></p><p style="line-height: 1.5;"><br></p><p style="line-height: 1.5;"><span style="font-size: 14px;">6.信息共享和传输</span></p><p style="line-height: 1.5;"><span style="font-size: 14px;">除非获得您的明确同意或法律法规要求，我们不会向第三方共享或传输您的个人信息。在必要情况下，我们将按照相关法律法规的规定进行信息共享和传输。</span></p><p style="text-indent: 2em; line-height: 1.5;"><br></p><p style="line-height: 1.5;"><span style="font-size: 14px;">7.隐私政策的更新与告知</span></p><p style="line-height: 1.5;"><span style="font-size: 14px;">我们保留修改本政策的权利。如果有任何修改，我们将在小程序上进行公告，并在合理范围内提前通知您。如果您继续使用我们的服务，即表示您已经接受了本政策的修改。</span></p><p style="text-indent: 2em; line-height: 1.5;"><br></p><p style="line-height: 1.5;"><span style="font-size: 14px;">8.法律责任和免责声明</span></p><p style="line-height: 1.5;"><span style="font-size: 14px;">如果您在使用本小程序过程中遇到任何问题或对我们的服务有任何疑问，请随时联系我们。我们将尽力为您提供帮助。同时，我们保留在不通知您的情况下修改本协议的权利。如果您不同意本协议的修改，请停止使用本小程序。 本协议受中华人民共和国法律法规管辖，如有违反，我们愿意承担相应的法律责任。 免责声明: 尽管我们已采取合理措施保护您的个人信息，但请您注意网络传输风险和数据安全风险。对于因不可抗力、网络攻击、通讯故障等原因造成的损失，我们不承担任何责任。</span></p><p style="line-height: 1.5;"><br></p><p><br></p><p><br></p><p><br></p>`
		};
	},
	onLoad(option) {},
	methods: {}
};
</script>

<style lang="less" scoped>
.container {
	padding: 32rpx;
}
</style>
