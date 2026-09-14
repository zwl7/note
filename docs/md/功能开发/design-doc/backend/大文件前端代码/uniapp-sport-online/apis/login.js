import request from '../utils/http.js'
import config from '../core/config.js'

// 获取微信code
function getWxCode() {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success(res) {
				resolve(res)
			},
			fail() {
				reject('faily get wxcode')
			}
		})
	})
}


// 登录 
export const login = async () => {
	const {
		code
	} = await getWxCode()
	return request({
		url: '/sportOnlinePlatform/wxMember/miniLogin',
		data: {
			code,
			company_id: config.company_id,
			is_login: 1
		}
	})
}
export const miniAuthLogin = (params) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/miniAuthLogin',
		data: params
	})
}
export const handleAuthenticate = (params) => {
	return request({
		url: '/sportOnlinePlatform/wxMember/authenticate',
		data: params
	})
}
// 会员小程序授权  更新用户信息
export const updateUserInfo = data => {
	return request({
		url: '/sportOnlinePlatform/wxMember/miniAuth',
		data: data
	})
}

// 获取用户信息
export const getUserInfo = data => {
	return request({
		url: '/sportOnlinePlatform/wxMember/get',
		data: data
	})
}