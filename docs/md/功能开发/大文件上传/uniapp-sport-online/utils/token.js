import {
	Gets,
	Sets,
	Clear
} from './storageUtil.js'

// TOKEN
let tokenKey = 'token'
export function setToken(data, isSync = false) {
	return Sets(tokenKey, data, isSync)
}
export function getToken(isSync = false) {
	return Gets(tokenKey, isSync)
}
export function clearToken(data, isSync = false) {
	return Clear(tokenKey, isSync)
}

// match_id
let matchKey = 'match_id'
export function setMatchId(data, isSync = false) {
	return Sets(matchKey, data, isSync)
}
export function getMatchId(isSync = false) {
	return Gets(matchKey, isSync)
}
export function clearMatchId(data, isSync = false) {
	return Clear(matchKey, isSync)
}

// 我的赛事详情信息
let myEventDetailInfoKey = 'myEventDetailInfo'
export function setMyEventDetailInfo(data, isSync = false) {
	return Sets(myEventDetailInfoKey, data, isSync)
}
export function getMyEventDetailInfo(isSync = false) {
	return Gets(myEventDetailInfoKey, isSync)
}
export function clearMyEventDetailInfo(data, isSync = false) {
	return Clear(myEventDetailInfoKey, isSync)
}

// --------------------------------------------------


// 全局搜索字段存储
let globalSearchKey = 'globalSearchKey'
export function setGlobalSearchKey(data, isSync = true) {
	return Sets(globalSearchKey, data, isSync)
}
export function getGlobalSearchKey(isSync = true) {
	return Gets(globalSearchKey, isSync)
}
export function clearGlobalSearchKey(data, isSync = true) {
	return Clear(globalSearchKey, isSync)
}

// 全局用户信息  插入搜索
/* 
 city_id:'',
 city_name:'',
 lat:'',
 lng:'',
 */
let userInfoKey = 'globalUserSearchInfo'
export function setUserInfoKey(data, isSync = true) {
	return Sets(userInfoKey, data, isSync)
}
export function getUserInfoKey(isSync = true) {
	return Gets(userInfoKey, isSync)
}
export function clearUserInfoKey(data, isSync = true) {
	return Clear(userInfoKey, isSync)
}
export function getUserInfoKeySync() {
	return uni.getStorageSync(userInfoKey)
}