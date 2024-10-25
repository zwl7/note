let padding = 38 //左右padding
let width = 670 //总长度
let height = 1044 //总高度



export default class LastMayday {
	constructor(info) {
		this.info = info
	}
	palette() {
		return {
			width: width + 'px',
			height: height + 'px',
			background: 'transparent',
			views: [
				...this.getBackground(),
				this.getUserAvatar(),
				this.getUserName(),
				this.getWelcome(),
				this.getVideoImage(),
				this.getMatchName(),
				this.getViewInfo(),
				this.getBottomWelcomeTip(),
				...this.getLogoInfo(),
				...this.getQrcode()
			]
		}
	}

	// 背景图片
	getBackground() {
		return [{
			id: 'backgroundImg',
			type: 'image',
			url: 'https://cdn-static.papa.com.cn/sport_online/painter_bg.png',
			css: {
				top: '70px',
				left: 0,
				width: '670px',
				height: '974px'
			}
		}]
	}
	// 用户头像
	getUserAvatar() {
		return {
			id: 'avatar',
			type: 'image',
			url: this.info.member_avatar,
			css: {
				width: '138px',
				height: '138px',
				borderRadius: '138px',
				borderWidth: "6px",
				borderStyle: "solid",
				borderColor: "#f94e47",
				top: '6px',
				left: `${335 - 69}px`
			}
		}
	}

	//昵称
	getUserName() {
		return {
			id: "userName",
			type: 'text',
			text: this.info.member_nick_name,
			css: {
				fontSize: '40px',
				fontWeight: '400',
				color: '#fff',
				top: 'calc(avatar.height + 24px)',
				left: '0',
				width: '100%',
				maxLines: 2,
				lineHeight: '54px',
				textAlign: "center"
			}
		}
	}

	// 欢迎语
	getWelcome() {
		return {
			id: "welcome",
			type: 'text',
			text: this.info.video_name,
			css: {
				fontSize: '28px',
				fontWeight: '400',
				color: '#FFE5B8',
				top: 'calc(userName.top + userName.height +16px)',
				left: '125px',
				width: '420px',
				maxLines: 2,
				lineHeight: '40px',
				textAlign: "center"
			}
		}
	}


	// 视频图片
	getVideoImage() {
		return {
			id: 'videoImage',
			type: 'image',
			url: this.info.images,
			css: {
				width: '594px',
				height: '334px',
				borderRadius: '32px',
				top: 'calc(welcome.top + welcome.height +36px)',
				left: `38px`
			}
		}
	}
	// 获取赛事标题
	getMatchName() {
		return {
			id: 'matchName',
			type: 'text',
			text: this.info.match_name,
			css: {
				fontSize: '32px',
				fontWeight: '500',
				color: '#323233',
				top: 'calc(videoImage.top + videoImage.height +16px)',
				left: '38px',
				width: '594px',
				maxLines: 2,
				lineHeight: '40px',
				textAlign: "left"
			}
		}
	}

	// 获取浏览播放等等
	getViewInfo() {
		return {
			id: 'viewInfo',
			type: 'text',
			text: `播放${this.info.see}    点赞${this.info.love}    ${this.info.show_time}`,
			css: {
				fontSize: '24px',
				fontWeight: '400',
				color: '#969799',
				top: 'calc(matchName.top + matchName.height +16px)',
				left: '38px',
				width: '594px',
				maxLines: 1,
				lineHeight: '40px',
				textAlign: "left"
			}
		}
	}

	// 获取底部欢迎语
	getBottomWelcomeTip() {
		return {
			id: 'welcomeTip',
			type: 'image',
			url: 'https://cdn-static.papa.com.cn/sport_online/painer_text.png',
			css: {
				width: '346px',
				height: '38px',
				top: 'calc(viewInfo.top + viewInfo.height + 32px)',
				left: `38px`
			}
		}
	}
	// 获取logo
	getLogoInfo() {
		return [{
				id: 'logoImg',
				type: 'image',
				url: 'https://cdn-static.papa.com.cn/sport_online/logo.png',
				css: {
					width: '66px',
					height: '66px',
					top: 'calc(welcomeTip.top + welcomeTip.height + 58px)',
					left: `38px`
				}
			},
			{
				id: "titleName",
				type: 'text',
				text: '河南省全民健身中心',
				css: {
					fontSize: '24px',
					fontWeight: '400',
					color: '#323233',
					top: 'calc(welcomeTip.top + welcomeTip.height + 70px)',
					left: 'calc(logoImg.width + logoImg.left + 16px)',
					width: '240px',
					maxLines: 2,
					lineHeight: '32px'
				}
			}
		]
	}

	getQrcode() {
		return [{
				id: 'qrcodeOut',
				type: 'image',
				url: 'https://cdn-static.papa.com.cn/sport_online/painter_qrcode.png',
				css: {
					width: '162px',
					height: '162px',
					top: 'calc(welcomeTip.top)',
					right: `38px`
				}
			},
			{
				id: 'qrcodeImage',
				type: 'image',
				url: this.info.qrcode,
				css: {
					width: '156px',
					height: '156px',
					top: 'calc(welcomeTip.top + 3px)',
					right: `41px`
				}
			},
		]
	}
}