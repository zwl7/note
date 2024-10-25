const showToast = (text, time = 1500, icon = 'none') => {
	uni.showToast({
		title: text,
		duration: time,
		icon: icon != undefined && icon != NaN && icon != '' && icon != 'none' ? icon : 'none'
	})
}
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj, cache = new WeakMap()) {
	if (obj === null || typeof obj !== 'object') return obj;
	if (cache.has(obj)) return cache.get(obj);
	let clone;
	if (obj instanceof Date) {
		clone = new Date(obj.getTime());
	} else if (obj instanceof RegExp) {
		clone = new RegExp(obj);
	} else if (obj instanceof Map) {
		clone = new Map(Array.from(obj, ([key, value]) => [key, deepClone(value, cache)]));
	} else if (obj instanceof Set) {
		clone = new Set(Array.from(obj, value => deepClone(value, cache)));
	} else if (Array.isArray(obj)) {
		clone = obj.map(value => deepClone(value, cache));
	} else if (Object.prototype.toString.call(obj) === '[object Object]') {
		clone = Object.create(Object.getPrototypeOf(obj));
		cache.set(obj, clone);
		for (const [key, value] of Object.entries(obj)) {
			clone[key] = deepClone(value, cache);
		}
	} else {
		clone = Object.assign({}, obj);
	}
	cache.set(obj, clone);
	return clone;
}

// 判断是否全屏
function isFullScreen() {
	return new Promise(reslove => {
		uni.createSelectorQuery()
			.selectViewport()
			.scrollOffset()
			.exec(async res => {
				const windowHeight = uni.getSystemInfoSync().windowHeight
				const scrollHeight = res[0].scrollHeight
				let obj = {
					windowHeight: windowHeight,
					scrollHeight: scrollHeight,
					isFullScreen: windowHeight > scrollHeight
				}
				reslove(obj)
			})
	})
}

/**
 * 判断现在时间是否比较小
 * 小于 lt  in  大于gt 
 */
function judgeTime(statrTime, endTime) {
	let _nowTime = new Date().getTime()
	let _startTime = getDateTime(statrTime)
	let flag = 'lt' //小于 lt  in  大于gt 
	if (endTime) {
		let _endTime = getDateTime(endTime)
		if (_nowTime < _startTime) {
			flag = 'lt'
		} else if (_nowTime >= _startTime && _nowTime <= _endTime) {
			flag = 'in'
		} else if (_nowTime > _endTime) {
			flag = 'gt'
		}
	} else {
		if (_nowTime < _startTime) {
			flag = 'lt'
		} else {
			flag = 'gt'
		}
	}
	return flag




	function getDateTime(time) {
		let date = 0
		if (typeof time === 'object' && time instanceof Date) {
			date = new Date(time).getTime()
		} else {
			if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
				time = parseInt(time)
			}
			if (typeof time === 'number' && time.toString().length === 10) {
				time = time * 1000
			}
			date = new Date(time).getTime()
		}
		return date
	}

}

function openUrl(url) {
	uni.navigateTo({
		url: '/pages/webView/webView?url=' + encodeURIComponent(url)
	})
}

export default {
	showToast,
	deepClone,
	isFullScreen,
	judgeTime,
	openUrl
}