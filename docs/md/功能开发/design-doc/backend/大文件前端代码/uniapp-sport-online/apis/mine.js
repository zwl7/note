import request from '../utils/http.js'


// 我的赛事
export const getMyMatchActivity = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/getMyMatchActivity',
		data: data
	})
}

// 我的赛事视频
export const getMyVideo = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/getMyVideo',
		data: data
	})
}


// 我的参赛视频列表
export const getMyVideoList = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/getMyVideoList',
		data: data
	})
}

// 我的证书列表
export const getMyCertList = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/myCertList',
		data: data
	})
}


// 上传活动视频
export const uploadActivityVideo = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/uploadActivityVideo',
		data: data
	})
}

// 更新活动视频
export const updateActivityVideo = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/updateActivityVideo',
		data: data
	})
}

// 参赛视频详情
export const getActivityVideoDetail = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/getActivityVideoDetail',
		data: data
	})
}

// 查询非本平台颁发的证书详情
export const getOtherCert = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/getOtherCert',
		data: data
	})
}

// 获取某个比赛的证书详情
export const getCertDetail = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/getCertDetail',
		data: data
	})
}

// 领取证书
export const updateCertDetail = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/updateCertDetail',
		data: data
	})
}

// 获取我报名比赛的报名信息
export const getApplyInfo = (data) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/getApplyInfo',
		data: data
	})
}

export const getWxMember = (params) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/get',
		data: params
	})
}

// 删除参赛视频
export const delActivityVideo = (params) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/delActivityVideo',
		data: params
	})
}