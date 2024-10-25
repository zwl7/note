export function Gets(key, isSync = false) {
	if (typeof key != 'string') {
		throw new Error('key is typeof string at storage.Get')
		return false
	}
	if (key.Trim() == '') {
		throw new Error('key is not null at storage.Get')
		return false
	}
	return new Promise((resolve, reject) => {
		if (isSync) {
			try {
				let result = uni.getStorageSync(key.Trim())
				resolve(result)
			} catch (error) {
				resolve()
			}
		} else {
			uni.getStorage({
				key: key.Trim(),
				success: function(res) {
					let result = res.data
					resolve(result)
				},
				fail(error) {
					reject(error.errMsg)
				}
			})
		}
	})
}

export function Sets(key, data, isSync = false) {
	if (typeof key != 'string') {
		throw new Error('key is typeof string at storage.Set')
		return false
	}
	if (key.Trim() == '') {
		throw new Error('key is not null at storage.Set')
		return false
	}
	return new Promise((resolve, reject) => {
		if (isSync) {
			uni.setStorageSync(key.Trim(), data)
			resolve({
				errMsg: 'storage okey'
			})
		} else {
			uni.setStorage({
				key: key.Trim(),
				data,
				success: function(res) {
					resolve({
						errMsg: 'storage okey'
					})
				}
			})
		}
	})
}

export function Clear(key = '', isSync = false) {
	if (typeof key != 'string') {
		throw new Error('key is typeof string at storage.Clear')
		return false
	}
	return new Promise((resolve, reject) => {
		if (key == '') {
			if (isSync) {
				uni.clearStorage({
					success() {
						resolve({
							errMsg: 'clearStorage is okey1'
						})
					}
				})
			} else {
				uni.clearStorageSync()
				resolve({
					errMsg: 'clearStorage is okey2'
				})
			}
		} else {
			if (!isSync) {
				uni.removeStorage({
					key: key.Trim(),
					success() {
						resolve({
							errMsg: 'clearStorage is okey3'
						})
					}
				})
			} else {
				uni.removeStorageSync(key.Trim())
				resolve({
					errMsg: 'clearStorage is okey4'
				})
			}
		}
	})
}
String.prototype.Trim = function() {
	return this.replace(/(^s*)|(s*$)/g, '')
}