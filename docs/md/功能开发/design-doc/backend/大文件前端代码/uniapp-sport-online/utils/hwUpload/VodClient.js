import {
	hWSecurityTokens,
	hWVodCreateAsset,
	hWConfirmAssetUpload,
} from '@/apis/upload.js';
import dom from '../lib/dom.js';
import Parser from '../lib/dom-parser.js'
import {
	FileHandle,
	EventEmitter
} from './fileHandle.js'


class VodClient extends FileHandle {
	constructor(option = {}) {
		super(option)
		this.tempFilePath = option.tempFilePath //临时文件路径
		this.credential = {
			access: "",
			expires_at: "",
			secret: "",
			securitytoken: "",
		}
		this.XAuthToken = ''
		// ----------------
		this.asset_id = ""
		this.video_upload_url = ""
		this.bucket = ""
		this.location = ""
		this.object = ""
		// --------------------
		this.project_id = '09cb3c544e8010582fc1c006957ef9cf' // 项目ID
		this.vod_server = 'vod.cn-north-4.myhuaweicloud.com' // 终端节点Endpoint
		this.sign_str = ''
		this.UploadId = ''
		this.progress = 0
		this.uploadedSize = 0
		this.isFail = false
		this.emitter = new EventEmitter()
		this.startUploadTime = 0
		this.averageSpeed = 0;
		this.timeRemaining = Number.POSITIVE_INFINITY;
		this.requestcount = 0
		this.start_time = 0
	}

	// 上传方法
	async upload() {
		console.log("上传开始时间", Date.now())
		this.start_time = Date.now()
		this._reset()
		await this.gethWSecurityTokens();
		await this.createAsset();
		if (!this.handlebucket(this.bucket) && this.requestcount < 10) {
			console.log('请求重试')
			this.requestcount += 1
			await this.sleep()
			await this.gethWSecurityTokens();
			await this.createAsset();
		}
		await this.initializationUpload();
		await this.InitializationUploadPart();
		let res_ = await this.uploadChunk();
		let res_3 = await this.GetUploadPart();
		res_3 = await this.isComplete();
		this.isConfirm();
		console.log("上传结束时间", Date.now())
		console.log('本次上传时间：', Date.now() - this.start_time)
	}
	// 重置参数
	_reset() {
		this.startUploadTime = Date.now();
		this.isFail = false;
		this.progress = 0;
		this.uploadedSize = 0;
		this.sizeNeedSend = this.totalSize;
		this.averageSpeed = 0;
		this.requestcount = 0;
		this.timeRemaining = Number.POSITIVE_INFINITY;
	}
	updateUploadSize(currUploadSize) {
		this.uploadedSize += currUploadSize; // 总体上传大小，暂停后累计
		const sizeWaitSend = this.sizeNeedSend - this.uploadedSize; // 剩余需要发送的大小
		this.progress = parseInt((this.uploadedSize * 100) / this.sizeNeedSend, 10);
		const time = Date.now() - this.startUploadTime; // 当前耗时
		const averageSpeed = this.uploadedSize / time; // B/ms
		this.timeRemaining = parseInt(sizeWaitSend / averageSpeed, 10); // 剩余时间
		this.averageSpeed = parseInt(averageSpeed, 10) * 1000; // 平均速度 B/s
		this.emit("progress", {
			totalSize: this.totalSize,
			progress: this.progress,
			uploadedSize: this.uploadedSize,
			averageSpeed: this.averageSpeed,
			timeRemaining: this.timeRemaining,
		});
	}
	emit(event, data) {
		this.emitter.emit(event, data);
	}
	on(event, listenr) {
		this.emitter.on(event, listenr);
	}
	off(event, listenr) {
		this.emitter.off(event, listenr);
	}

	handleFail(e) {
		if (this.isFail) return;
		console.error('handleFail', e)
		this.isFail = true;
		this.emit("fail", e);
		this.emit("complete", e);
	}

	// 第一步   获取token
	gethWSecurityTokens() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await hWSecurityTokens({});
				if (res) {
					this.credential = res.data.credential
					this.XAuthToken = res.data.token
					console.log('第一步   获取token', res)
				}
				resolve(true);
			} catch (e) {
				console.error('----第一步,获取token', e)
				reject(e)
				this.handleFail({
					errMsg: '1.获取token失败'
				})
			}

		})
	}

	// 第二步   创建媒资
	createAsset() {
		return new Promise(async (resolve, reject) => {
			try {
				let infoList = this.tempFilePath.split('/');
				let info = infoList[infoList.length - 1];
				const res = await hWVodCreateAsset({
					title: info.split('.')[0],
					video_name: info.split('.')[0],
					video_type: 'MP4'
				});
				this.asset_id = res.data.asset_id
				this.video_upload_url = res.data.video_upload_url
				this.bucket = res.data.target.bucket
				this.location = res.data.target.location
				this.object = res.data.target.object
				console.log('第二步   创建媒资', res)
				resolve()
			} catch (e) {
				console.error('----第二步,创建媒资', e)
				reject(e)
				this.handleFail({
					errMsg: '2.创建媒资失败'
				})
			}
		})
	}
	// 第三步   获取授权 初始化上传任务
	initializationUpload() {
		let obj = {
			http_verb: 'POST',
			content_type: 'video/mp4',
			bucket: this.bucket,
			object_key: this.object
		}
		let _this = this
		return new Promise((resolve, reject) => {
			let url = `https://${this.vod_server}/v1.0/${this.project_id}/asset/authority`
			url = _this.haneleurl(url)
			wx.request({
				url: url,
				method: 'GET',
				data: obj,
				header: {
					'X-Project-Id': this.project_id,
					'X-Auth-Token': this.XAuthToken,
				},
				success(res) {
					resolve(res)
					console.log('第三步   获取授权 初始化上传任务', res)
					_this.sign_str = res.data.sign_str
				},
				fail(res) {
					reject(res)
					_this.handleFail({
						errMsg: '3.获取授权 初始化上传任务失败'
					})
				}
			})
		})
	}

	// 第四步 初始化视频分段上传任务
	InitializationUploadPart() {
		let sign_str = this.sign_str.replace(/&amp;/g, '&')
		let _this = this
		return new Promise((resolve, reject) => {
			let url =
				`https://${this.bucket}.obs.myhwclouds.com/${encodeURI(this.object)}?uploads&${sign_str}`
			url = _this.haneleurl(url)
			wx.request({
				url: url,
				method: 'POST',
				header: {
					"content-type": 'video/mp4',
				},
				success(res) {
					console.log('第四步 初始化视频分段上传任务', res)
					let xml = _this.resolveXML(res.data)
					console.log(xml)
					_this.UploadId = xml.UploadId
					resolve(res)

				},
				fail(res) {
					reject(res)
					_this.handleFail({
						errMsg: '4.初始化视频分段上传任务'
					})
				}
			})
		})
	}
	// 第五步  分段上传授权
	GetAuthorization(index, md5) {
		let sign_str = this.sign_str.replace(/&amp;/g, '&')
		let _this = this
		let obj = {
			http_verb: 'PUT',
			content_type: "video/mp4",
			bucket: this.bucket,
			object_key: this.object,
			content_md5: md5,
			upload_id: this.UploadId,
			part_number: index
		}
		return new Promise((resolve, reject) => {
			let url = `https://${this.vod_server}/v1.1/${this.project_id}/asset/authority`
			url = _this.haneleurl(url)
			wx.request({
				url: url,
				method: 'GET',
				data: obj,
				header: {
					'X-Auth-Token': this.XAuthToken,
					'Content-MD5': md5
				},
				success(res) {
					resolve(res)
				},
				fail(res) {
					reject(res)
					_this.handleFail({
						errMsg: '5.' + String(res)
					})
				}
			})
		})
	}

	// 第六步  上传分段
	UploadPart(url, MD5, data) {
		let _this = this
		return new Promise((resolve, reject) => {
			url = _this.haneleurl(url)
			wx.request({
				url: url,
				method: 'PUT',
				header: {
					'content-type': 'application/octet-stream',
					'Content-MD5': MD5
				},
				data: data,
				success(res) {
					if (res.statusCode === 200) {
						console.log('上传成功')
					} else {}
					resolve(true)
				},
				fail(res) {
					_this.handleFail({
						errMsg: '6.' + String(res)
					})
				}
			});
		})

	}

	uploadChunk() {
		return new Promise(async (resolve, reject) => {
			let list = []
			for (let i = 0; i < this.chunksIndexNeedRead.length; i++) {
				list.push(this.readUploadFile(i))
			}
			var arr = [];
			var result = list.reduce(function(pre, item, index, list) {
				var begin = index * 5;
				var end = begin + 5;
				var res = list.slice(begin, end);
				if (res.length != 0) {
					arr[index] = res;
				}
				return arr;
			}, []);
			for (let i = 0; i < arr.length; i++) {
				await Promise.all(arr[i])
			}
			resolve(true)
		})
	}
	readUploadFile(i) {
		return new Promise(async (resolve) => {
			let {
				chunk,
				length,
				index,
			} = await this.readFile(i)
			let md5 = await this.computeMD5(chunk)
			let res1 = await this.GetAuthorization(index + 1, md5)
			let count = 0
			let is_upload = false
			while (count < 5 && !is_upload) {
				try {
					let res2 = await this.UploadPart(res1.data.sign_str, md5, chunk)
					is_upload = true
				} catch (e) {
					this.handleFail({
						errMsg: '切片上传失败，重实上传'
					})
				}
			}
			this.updateUploadSize(length)
			resolve(true)
		})
	}


	// 第七步  获取已上传分段授权
	GetPartAuthorization(options) {
		let sign_str = this.sign_str.replace(/&amp;/g, '&')
		let _this = this
		let obj = {
			http_verb: this.http_verb,
			bucket: this.bucket,
			object_key: this.object,
			upload_id: _this.UploadId,
		}
		obj = Object.assign(obj, options)
		return new Promise((resolve, reject) => {
			let url = `https://${this.vod_server}/v1.1/${this.project_id}/asset/authority`
			url = _this.haneleurl(url)
			wx.request({
				url: url,
				method: 'GET',
				data: obj,
				header: {
					'X-Auth-Token': this.XAuthToken,
				},
				success(res) {
					console.log('第七步  分段上传授权', res)
					resolve(res)

				},
				fail(res) {
					reject(res)
					_this.handleFail({
						errMsg: '7.分段上传授权失败'
					})
				}
			})
		})
	}

	// 第九步  获取已上传分段
	GetUploadPart() {
		let _this = this
		return new Promise(async (resolve, reject) => {
			let _res = await _this.GetPartAuthorization({
				http_verb: "GET"
			})
			let url = _this.haneleurl(_res.data.sign_str, )
			wx.request({
				url: url,
				method: 'GET',
				header: {
					'Content-Type': ' ',
				},
				success(res) {
					console.log(res)
					let _xmlres = _this.resolveXML2(res.data)
					_this._xmlres = _xmlres
					resolve(res)
				},
				fail(res) {
					reject(res)
					_this.handleFail({
						errMsg: '8.获取已上传分段失败'
					})
				}
			})
		})
	}

	// 第十步 
	isComplete() {
		let _this = this
		return new Promise(async (resolve, reject) => {
			let _res = await _this.GetPartAuthorization({
				http_verb: "POST"
			})
			let url =
				`https://${this.bucket}.obs.myhwclouds.com/${encodeURI(this.object)}?uploads&${_res.data.sign_str}`
			wx.request({
				url: _this.haneleurl(_res.data.sign_str),
				method: 'POST',
				header: {
					"content-type": 'application/xml'
				},
				data: _this._xmlres.xml_res,
				success(res) {
					resolve(res)
				},
				fail(res) {
					reject(res)
					_this.handleFail(res)
				}
			})
		})
	}


	isConfirm() {
		let _this = this
		return new Promise(async (resolve, reject) => {
			let _res = await hWConfirmAssetUpload({
				asset_id: this.asset_id
			})
			_this.emit("success", {
				errCode: 0,
				url: _res.data.video_url,
			});
			_this.emit("complete", {
				errCode: 0,
				..._res.data,
			});
			resolve(_res)
		})
	}




	resolveXML(xml) {
		try {
			var XMLParser = new Parser.DOMParser()
			var doc = XMLParser.parseFromString(xml);
			var docRoot = doc.getElementsByTagName('InitiateMultipartUploadResult')['0'];
			var UploadId = docRoot.getElementsByTagName('UploadId')['0'];
			var Bucket = docRoot.getElementsByTagName('Bucket')['0'];
			var Key = docRoot.getElementsByTagName('Key')['0'];
			return {
				UploadId: UploadId.firstChild.data,
				Bucket: Bucket.firstChild.data,
				Key: Key.firstChild.data,
			}
		} catch (res) {
			console.error('xml解析失败', res)
			_this.handleFail({
				errMsg: 'xml解析失败'
			})
		}
	}

	resolveXML2(xml) {
		let _this = this
		try {
			var XMLParser = new Parser.DOMParser()
			var doc = XMLParser.parseFromString(xml);
			var docRoot = doc.getElementsByTagName('ListPartsResult')['0'];
			var Part = docRoot.getElementsByTagName('Part');
			var UploadId = docRoot.getElementsByTagName('UploadId')['0'];
			UploadId = UploadId.firstChild.data
			let str = ``
			for (let _i = 0; _i < Part.length; _i++) {
				let e = Part[_i]
				let PartNumber = e.getElementsByTagName('PartNumber')['0']
				let ETag = e.getElementsByTagName('ETag')['0']
				PartNumber = PartNumber.firstChild.data
				ETag = ETag.firstChild.data
				str += `<Part>
        <PartNumber>${PartNumber}</PartNumber>
        <ETag>${ETag}</ETag>
				</Part>`
			}
			let res = `<CompleteMultipartUpload>${str}</CompleteMultipartUpload>`
			console.log('------------res', {
				xml_res: res,
				UploadId: UploadId
			})
			return {
				xml_res: res,
				UploadId: UploadId
			}
		} catch (res) {
			console.error('xml解析失败', res)
			_this.handleFail({
				errMsg: 'xml解析失败'
			})
		}
	}


	haneleurl(url) {
		return url.replace(/.com:443/gi, '.com')
	}

	handlebucket(bucket) {
		let match = bucket.match(/vod-bucket-(.*)-cn-north-4/);
		let result = match ? match[1] : null;
		console.log('当前请求桶id：', result)
		if (result < 5 || result > 95) {
			return false
		} else {
			return true
		}

	}


	sleep(time = 300) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve()
			}, time)
		})
	}

}

export default VodClient;