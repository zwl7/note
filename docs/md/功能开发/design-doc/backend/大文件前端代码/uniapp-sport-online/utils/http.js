import config from '../core/config.js'
import {
	getToken,
	setToken,
	clearToken,
	getUserInfoKeySync,
	getMatchId,
	setMatchId
} from './token.js'

let isRefreshing = true
let loginCompelete = false
let subscribers = []
let loginCount = 0

function onAccessTokenFetched() {
	console.log(subscribers.length)
	subscribers.forEach(callback => {
		callback()
	})
	subscribers = []
}

function addSubscriber(callback) {
	subscribers.push(callback)
}

function getUrl(url) {
	let reg = new RegExp('http')
	let flag = reg.test(url)
	if (flag) {
		return url
	} else {
		return config.baseUrl + url
	}
}

async function request({
	url,
	data = {},
	header,
	callback = ''
} = {}) {
	let method = 'POST'
	let isLogin = data.is_login === 1
	let token = ''
	try {
		token = await getToken(true)
	} catch (error) {}
	url = getUrl(url)
	let match_id = await getMatchId(true)
	data = Object.assign({
		company_id: config.company_id,
		...data
	}, {
		match_id: match_id
	})
	return new Promise((resolve, reject) => {
		if ((!isLogin && !token)) {
			addSubscriber(() => {
				console.log('添加队列', url, resolve)
				request({
					url,
					data,
					method,
					header,
					callback: resolve
				})
			})
			return
		}
		uni.request({
			url,
			data,
			method,
			header: {
				Authorization: token,
				'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
				Origin: config.baseUrl.split('://')[1]
			},
			callback,
			fail(res) {
				reject(res)
			},
			complete: res => {
				if ((callback) || (callback && loginCount > 10)) {
					return callback(res.data)
				}
				let statusCode = res.statusCode
				if (statusCode == 200) {
					if (isLogin) {
						loginCompelete = true
						let user_info = {
							member_id: res.data.data.account_id,
							business_id: res.data.data.business_id
						}
						setMatchId(res.data.data.match_id)
						setToken(res.data.data.token, true).then(c => {})
						onAccessTokenFetched()
					}
					if (res.data.code === 40114 || res.data.code === 40101) {
						if (data.city_id) {
							delete data.city_id
						}
						loginCount += 1
						addSubscriber(() => {
							request({
								url,
								data,
								method,
								header,
								callback: resolve
							})
						})
						clearToken()
						if (isRefreshing) {
							getNewToken().then(() => {
								onAccessTokenFetched()
								isRefreshing = true
							})
						}
						isRefreshing = false
						return
					}
					resolve(res.data)
				} else if (statusCode.startsWith('5')) {
					uni.showModal({
						content: '服务器报错，请重试！',
						showCancel: false
					})
				}
			}
		})
	})
}

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
// 获取token
const getNewToken = () => {
	return new Promise(async (resolve, reject) => {
		let res = await getWxCode()
		let {
			code
		} = res
		request({
			url: '/infoPlatform/wxMember/miniLogin',
			data: {
				code,
				company_id: config.company_id,
				is_login: 1
			}
		}).then(res => {
			if (res.code === 200) {
				setToken(res.data.token, true).then(c => {
					console.log('----获取token2', c)
					resolve(res)
				})
			} else {
				console.log('----获取token3', res)
				reject(res)
			}
		})
	})
}

export default request