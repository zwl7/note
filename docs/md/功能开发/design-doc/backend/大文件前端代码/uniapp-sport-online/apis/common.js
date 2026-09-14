import request from '../utils/http.js'

// 获取公告详情
export const getWxNoticeDetail = (data) => {
	return request({
		url: '/infoPlatform/wxNotice/get',
		data: data
	})
}

// 获取公告列表
export const getWxNoticeList = (data) => {
	return request({
		url: '/infoPlatform/wxNotice/getlist',
		data: data
	})
}


// 获取全局赛会id
export const getMatchId = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxIndex/getMatchId',
		data: data
	})
}

// 视频信息上报接口
export const uploadVideoCount = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxIndex/uploadVideoCount',
		data: data
	})
}

// 获取小程序码
export const getMPCode = data => {
	return request({
		url: '/activityPlatform/wxPub/getMPCode',
		method: 'POST',
		data: data
	})
}

// 视频举报
export const videoReport = data => {
	return request({
		url: '/sportOnlinePlatform/wxIndex/videoReport',
		method: 'POST',
		data: data
	})
}

// 意见反馈列表
export const getFeedbackList = data => {
	return request({
		url: '/sportOnlinePlatform/wxMember/addFeedbackList',
		method: 'POST',
		data: data
	})
}

// 意见反馈新增
export const addFeedback = data => {
	return request({
		url: '/sportOnlinePlatform/wxMember/addFeedback',
		method: 'POST',
		data: data
	})
}

// 赛会详清
export const getMathDetail = data => {
	return request({
		url: '/sportOnlinePlatform/wxIndex/getMatchInfo',
		method: 'POST',
		data: data
	})
}