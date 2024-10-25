export default {
	data() {
		return {
			share: {
				title: '山东省体育场馆服务平台',
				path: '/pages/tabbar/home/index',
				imageUrl: '',
				withShareTicket: true
			}
		}
	},
	onShareAppMessage(res) {
		let that = this
		let pages = getCurrentPages();
		let nowPage = pages[pages.length - 1];
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
			withShareTicket: this.share.withShareTicket
		}
	}
}