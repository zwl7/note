import config from './../core/config.js'
export function formatTimeBase(time, cformat = '{y}/{m}/{d} {h}:{i}:{s}') {
	if (arguments.length == 0) {
		return null
	}
	const format = cformat || '{y}/{m}/{d} {h}:{i}:{s} 星期{a}'
	let date
	if (typeof time === 'object' && time instanceof Date) {
		date = time
	} else {
		if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
			time = parseInt(time)
		}
		if (typeof time === 'number' && time.toString().length === 10) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(
		/{([ymdhisa])+}/g,
		(result, key) => {
			let value = formatObj[key]
			if (key === 'a') {
				return ['日', '一', '二', '三', '四', '五', '六'][value]
			}
			return value.toString().padStart(2, '0')
		}
	)
	return time_str
}

export function formatRichText(html) {
	let newContent = ''
	newContent = html.replace(/<img[^>]*>/gi,
		function(match) {
			match = match.replace(`style=""`, '')
			match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
			match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
			match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
			return match;
		});
	newContent = newContent.replace(/style="[^"]+"/gi,
		function(match) {
			match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
			return match;
		});
	newContent = newContent.replace(/<br[^>]*\/>/gi, '');
	newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
	return newContent;
}

// 毫秒转 时间分 time为毫秒数
export function formatTimeHM(time) {
	let hours = Math.floor((time % 86400000) / 3600000); //时
	let minutes = Math.floor((time % 3600000) / 60000); //分
	let seconds = Math.floor((time % 60000) / 1000); //秒
	return `${minutes >= 10 ? minutes : '0' + minutes }:${seconds >= 10 ? seconds : '0' + seconds }`
}


/**
 * 验证手机格式
 */
export function testMobile(value) {
	return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value)
}

/**
/**
 * 验证身份证号码
 */
export function testIdCard(value) {
	return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
		value
	)
}

/**
 * 验证整数
 */
export function testDigits(value) {
	return /^\d+$/.test(value)
}


/**
 * 选择视频功能
 */
const judgeDuration = (current, max) => {
	if (current > max) {
		console.log("时长", current, max)
		uni.showToast({
			icon: 'none',
			title: '上传文件时长不得超过10分钟'
		})
		return false
	}
	return true
}
const judgeSize = (current, max) => {
	if (current > max) {
		console.log("大小", current, max)
		uni.showToast({
			icon: 'none',
			title: '上传文件大小不得超过1GB'
		})
		return false
	}
	return true
}
export function changeVideo(value) {
	let maxDuraiton = 1000 * 60 * 10 //10分钟
	let maxSize = 1 * 1024 * 1024 * 1024 // 1GB
	let _res = {
		status: true
	}
	return new Promise(async (resolve) => {
		const res = await uni.chooseMedia({
			count: 1,
			mediaType: ['video'],
			sourceType: ['album'],
			sizeType: ['compressed']
		});
		let file = res.tempFiles[0]

		file.duration = file.duration * 1000 //原本单位秒
		file.size = file.size // 单位kb
		let sizeFlag = judgeSize(file.size, maxSize)
		if (!sizeFlag) {
			_res.status = false
		}
		if (uni.canIUse('openVideoEditor')) {
			uni.openVideoEditor({
				filePath: file.tempFilePath,
				minDuration: '1000',
				maxDuration: String(maxDuraiton),
				success(res) {
					res.duration = res.duration
					let durationFlag = judgeDuration(res.duration, maxDuraiton)
					if (!durationFlag) {
						_res.status = false
					}

					Object.assign(_res, res)
					console.log("-----------------------file---res", res)
					_res.thumbTempFilePath = _res.tempThumbPath
					resolve(_res)
				},
				fail(err) {
					let durationFlag = judgeDuration(file.duration, maxDuraiton)
					if (!durationFlag) {
						_res.status = false
					}
					console.log("-----------------------file---fail", file)
					Object.assign(_res, file)
					resolve(_res)
				}
			});
		} else {
			let durationFlag = judgeDuration(file.duration, maxDuraiton)
			if (!durationFlag) {
				_res.status = false
			}
			Object.assign(_res, file)
			console.log("-----------------------file---fail22", file)
			resolve(_res)
		}
	})

}

//上传图片接口
export function uploadImage(filePath) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			filePath: filePath,
			name: 'image',
			url: config.baseUrl + '/img/upload',
			header: {
				'Content-Type': 'multipart/form-data'
			},
			success: res => {
				if (res.statusCode == 200) {
					let data = JSON.parse(res.data)
					if (data.code !== 200) {
						uni.showToast({
							title: data.message,
							icon: 'none'
						})
					} else {
						resolve(data)
					}
				} else {
					reject(res.data)
				}
			},
			fail: reject
		})
	})
}

// 保存图片处理
export function saveImageToAlbum(filePath, successFun, failFunc) {
	uni.saveImageToPhotosAlbum({
		filePath: filePath,
		success: function(t) {
			uni.showToast({
				title: '保存成功',
				icon: 'none',
				duration: 2e3
			})
			try {
				if (successFun) {
					if (typeof successFun === 'function') {
						successFun()
					} else {
						console.error('successFun不是函数')
					}
				}
			} catch (error) {}
		},
		fail: function(t) {
			console.log(t)
			if (t.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
				return
			}
			uni.showModal({
				title: '提示',
				content: '需要您授权保存相册',
				showCancel: false,
				success: function(t) {
					uni.openSetting({
						success: function(t) {
							t.authSetting['scope.writePhotosAlbum'] ?
								uni.showModal({
									title: '提示',
									content: '获取权限成功,再次点击按钮即可保存',
									showCancel: false
								}) :
								uni.showModal({
									title: '提示',
									content: '获取权限失败，将无法保存到相册哦~',
									showCancel: false
								})
						},
						fail: function(t) {
							try {
								if (failFunc) {
									if (typeof failFunc === 'function') {
										failFunc()
									} else {
										console.error('failFunc不是函数')
									}
								}
							} catch (error) {}
						},
						complete: function(t) {
							console.log('finishData', t)
						}
					})
				}
			})
		}
	})
}

//下载保存网络图片
export function saveNetImageToAlbum(filePath, successFun, failFunc) {
	uni.showLoading({
		title: '正在加载'
	})
	return new Promise((resolve) => {
		uni.downloadFile({
			url: filePath,
			success(res) {
				if (res.statusCode == 200) {
					saveImageToAlbum(res.tempFilePath)
					resolve(true)
				} else {
					resolve(false)
					uni.showToast({
						icon: 'none',
						title: "保存失败"
					})
				}
				uni.hideLoading()
			},
			fail() {
				uni.hideLoading()
				resolve(false)
				uni.showToast({
					icon: 'none',
					title: "保存失败"
				})

			}
		})
	})

}


export function buttonClicked(fn, n = 1500) {
	var u = null
	return function() {
		var e = +new Date()
		if (e - u > n || !u) {
			fn.apply(this, arguments)
			u = e
		}
	}
}

export function handleQrcodeScene(scene) {
	let str = decodeURIComponent(scene)
	let obj = {}
	if (str) {
		str.split('&').forEach(function(param) {
			var arr = param.split('=')
			obj[arr[0]] = arr[1]
		})
	}
	return obj
}





// 压缩
export function compressFile(src, i, size) {
	console.log(this.avatar)
	return new Promise((resolve) => {
		// 获取图片信息
		uni.getImageInfo({
			src,
			success: (img) => {
				let imgWidth = img.width
				let imgHeight = img.height

				let useCanvas = imgWidth <= 4096 && imgHeight <= 4096
				console.log(config.isIos)
				if (config.isIos) {
					useCanvas = false
				}
				console.log("-------------------useCanvas", config.isIos)
				if (useCanvas) {
					canvasToImg.call(this, src, i, imgWidth, imgHeight, size).then(res => {
						resolve(res)
					})
				} else {
					compressImage(src, size).then(res => {
						resolve(res)
					})
				}
			},
			fail: () => {
				compressImage(src, size).then(res => {
					resolve(res)
				})
			}
		})
	})
}

// 绘制canvas
export function canvasToImg(src, i, imgWidth, imgHeight, size) {
	return new Promise((resolve, reject) => {
		const systemInfo = uni.getSystemInfoSync();
		const pixelRatio = systemInfo.devicePixelRatio
		const baseSize = 1280
		let query = uni.createSelectorQuery().in(this)
		query.select(`#myCanvas${i}`)
			.fields({
				node: true,
				size: true
			})
			.exec((res) => {
				console.log(res)
				let canvas = res[0].node
				if (!canvas) {
					// 强制压缩
					compressImage(src, size).then(res => {
						resolve(res)
					})
					return
				}
				let ctx = canvas.getContext('2d')
				let pic = canvas.createImage()
				pic.src = src
				let canvasWidth = 0
				let canvasHeight = 0
				let quality = 1
				// 图片宽和高都小于基础值，则宽高不变，压缩质量为0.3，这里的基础值设为1280
				if (imgWidth <= baseSize && imgHeight <= baseSize) {
					canvasWidth = imgWidth
					canvasHeight = imgHeight
					quality = .3
				} else {
					let compareFlag = true
					// 手机宽高比大于2，图片一边大于基础值，一边小于基础值，则宽高不变，压缩质量为0.3
					if (pixelRatio > 2 && (imgWidth < baseSize || imgHeight < baseSize) && (imgWidth > baseSize || imgHeight > baseSize)) {
						canvasWidth = imgWidth
						canvasHeight = imgHeight
						quality = .3
					} else {
						// 手机宽高比大于2，宽高最小值设为基础值，另一边等比缩放，手机宽高比小于等于2，宽高最大值设为基础值，另一边等比缩放，压缩质量为0.9
						compareFlag = pixelRatio > 2 ? (imgWidth > imgHeight) : (imgWidth < imgHeight)
						canvasWidth = compareFlag ? parseInt(imgWidth / (imgHeight / baseSize)) : baseSize
						canvasHeight = compareFlag ? baseSize : parseInt(imgHeight / (imgWidth / baseSize))
						quality = .9
					}
				}
				// 设置canvas宽高
				canvas.width = canvasWidth
				canvas.height = canvasHeight
				pic.onerror = () => {
					// 图片加载失败则继续强制压缩
					this.compressImage(src, size).then(response => {
						resolve(response)
					})
				}
				pic.onload = () => {
					ctx.clearRect(0, 0, canvasWidth, canvasHeight);
					ctx.drawImage(pic, 0, 0, canvasWidth, canvasHeight)
					uni.canvasToTempFilePath({
						canvas,
						quality,
						fileType: 'jpg',
						width: canvasWidth,
						height: canvasHeight,
						destWidth: canvasWidth,
						destHeight: canvasHeight,
						success: resp => {
							// 生成的图片临时文件路径
							resolve(resp.tempFilePath)
							ctx.clearRect(0, 0, canvasWidth, canvasHeight);
						},
						fail: () => {
							compressImage(src, size).then(response => {
								resolve(response)
							})
						}
					})
				}
			})
	})
}
// 强制压缩
function compressImage(src, size) {
	return new Promise((resolve, reject) => {
		let quality = 100
		// ios因为自己有压缩机制，压缩到极致就不会再压，因此往小了写
		// if (this.data.isIOS) {
		// 	quality = 0.1
		// } else {
		// 	let temp = 30 - parseInt(size / 1024 / 1024)
		// 	quality = temp < 10 ? 10 : temp
		// }
		let temp = 30 - parseInt(size / 1024 / 1024)
		quality = temp < 10 ? 10 : temp
		if (size > 10 * 1024 * 1024) {
			quality = 1
		}
		uni.compressImage({
			src, // 图片路径
			quality, // 压缩质量
			success: function(res) {
				console.log('------------------------quality', res)
				resolve(res.tempFilePath)
			},
			fail: function(err) {
				resolve(src)
			}
		})
	})
}