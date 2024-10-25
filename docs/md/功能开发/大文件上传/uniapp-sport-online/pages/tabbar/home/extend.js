import {
	getProject,
	getIndexVideoList,
	getWxRecommend,
	getWxNotice,
	getFitList
} from '@/apis/index.js';


// 获取轮播列表
export function getWxRecommendList() {
	return new Promise(async (resolve) => {
		let res = await getWxRecommend({})
		if (res.code == 200) {
			this.swiperList = res.data
		} else {
			console.error(res.message)
		}
		resolve(1)
	})
}

// 获取公告通知
export function getWxNoticeList() {
	return new Promise(async (resolve) => {
		let res = await getWxNotice({})
		if (res.code == 200) {
			this.noticeList = res.data
		} else {
			console.error(res.message)
		}
		resolve(1)
	})
}

// 获取健身指导视频
export function getFit() {
	return new Promise(async (resolve) => {
		let res = await getFitList({
			page: 1,
			size: 5
		})
		if (res.code == 200) {
			this.fitList = res.data.list
			console.log(this.fitList)
		} else {
			console.error(res.message)
		}
		resolve(1)
	})
}

// 获取网络对弈
export function getNetworkGameList() {
	return new Promise(async (resolve) => {
		let res = await getProject({
			type: 1
		})
		this.networkGameList = res.data
		resolve(1)
	})
}

// 获取风采展示
export function getShowStyleList() {
	return new Promise(async (resolve) => {
		let res = await getProject({
			type: 2
		})
		let list = res.data
		this.showStyleCount = list.length
		this.projectList = list
		this.showStyleList = handleList(list)
		resolve(1)
	})
}

// 获取参赛作品列表
export function getVideoList(refresh) {
	return new Promise(async (resolve) => {
		this.productionLoading = true
		let params = {
			page: this.proPage,
			size: this.proSize
		}
		if (this.proSearchParams.type) {
			params.order_by = this.proSearchParams.type
		}
		if (this.proSearchParams.project_id) {
			params.project_id = this.proSearchParams.project_id
		}
		let res = await getIndexVideoList(params)
		this.productionList = this.productionList.concat(res.data.list)
		this.productionCount = res.data.count
		this.productionLoading = false
		if (res.data.list.length === 0) {
			this.productionFinished = true
		}
		if (refresh) {
			uni.stopPullDownRefresh()
		}
		resolve(1)
	})
}

function handleList(list, num = 5) {
	let res = []
	let split_index = 0
	if (list.length > 2 * num) {
		split_index = Math.ceil(list.length / 2)
	} else {
		split_index = num
	}
	res = [list.slice(0, split_index), list.slice(split_index)]
	return res
}