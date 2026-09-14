import request from '../utils/http.js'


// 获取轮播推荐
export const getWxRecommend = (data) => {
	return request({
		url: '/infoPlatform/wxRecommend/list',
		data: data
	})
}
// 获取公告通知
export const getWxNotice = (data) => {
	return request({
		url: '/infoPlatform/wxNotice/list',
		data: data
	})
}

// 健身指导视频列表
export const getFitList = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxIndex/fitList',
		data: data
	})
}

// 健身指导视频详情
export const getFitDetail = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxIndex/getFitDetail',
		data: data
	})
}


// 获取项目
export const getProject = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxIndex/getProject',
		data: data
	})
}

// 参赛作品列表
export const getIndexVideoList = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxIndex/videoList',
		data: data
	})
}



// 获取赛事详情
export const getMatchActivity = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxIndex/getMatchActivity',
		data: data
	})
}

// 赛事报名
export const applyMatch = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxIndex/applyMatch',
		data: data
	})
}

// 赛事报名
export const getMatchCountInfo = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxIndex/getCountInfo',
		data: data
	})
}