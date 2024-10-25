import request from '../utils/http.js'

export const hWSecurityTokens = (data) => {
	return request({
		url: '/infoPlatform/sys/hWSecurityTokens',
		data: data
	})
}
export const hWVodCreateAsset = (data) => {
	return request({
		url: '/infoPlatform/sys/hWVodCreateAsset',
		data: data
	})
}

export const hWConfirmAssetUpload = (data) => {
	return request({
		url: '/infoPlatform/sys/hWConfirmAssetUpload',
		data: data
	})
}