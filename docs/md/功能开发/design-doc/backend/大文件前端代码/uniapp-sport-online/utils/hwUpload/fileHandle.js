import Base64 from 'base-64'
import {
	createCommonjsModule,
	sparkMd5,
	isFunction,
	promisify
} from '@/utils/lib/sparkMd5Fn.js'


const fileManager = uni.getFileSystemManager();
const readFileAsync = promisify(fileManager.readFile);

class EventEmitter {
	constructor() {
		this.events = {};
	}

	on(event, listener) {
		if (typeof this.events[event] !== "object") {
			this.events[event] = [];
		}
		this.events[event].push(listener);
		return () => this.off(event, listener);
	}

	off(event, listener) {
		if (typeof this.events[event] === "object") {
			const idx = this.events[event].indexOf(listener);
			if (idx > -1) {
				this.events[event].splice(idx, 1);
			}
		}
	}

	emit(event, ...args) {
		if (typeof this.events[event] === "object") {
			this.events[event].forEach((listener) => listener.apply(this, args));
		}
	}

	once(event, listener) {
		const remove = this.on(event, (...args) => {
			remove();
			listener.apply(this, args);
		});
	}
}


class FileHandle {
	constructor(option = {}) {
		this.chunkSize = 10 * 1024 * 1024
		this.totalSize = option.totalSize
		this.totalChunks = Math.ceil(this.totalSize / this.chunkSize);
		this.tempFilePath = option.tempFilePath
		this.chunksIndexNeedRead = Array.from(Array(this.totalChunks).keys())
		this.sizeNeedSend = 0
	}

	async readFile(index) {
		const position = index * this.chunkSize;
		const length = Math.min(this.totalSize - position, this.chunkSize);
		let res = await readFileAsync({
			filePath: this.tempFilePath,
			position,
			length,
		})
		const chunk = res.data;
		return {
			chunk,
			length,
			index,
		}
	}

	async computeMD5(readFileResp) {
		const spark = new sparkMd5.ArrayBuffer();
		let chunk = readFileResp;
		spark.append(chunk);
		const identifier = spark.end(true);
		spark.destroy();
		return Base64.encode(identifier);
	}



}

export {
	FileHandle,
	EventEmitter
};