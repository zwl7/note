<script>
import config from './core/config.js';
import { login } from './apis/login.js';
import { getMatchId } from './apis/common.js';
import { setToken, clearToken, clearMatchId, setUserInfoKey, getUserInfoKey, setMatchId } from './utils/token.js';
export default {
	globalData: {
		isAuth: false,
		isIos: false,
		navBarHeight: 0,
		menuTop: 0,
		menuHeight: 0,
		menuRight: 0,
		menuWidth: 0,
		userInfo: {
			phone: '',
			nick_name: '',
			name: '',
			avatar_url: '',
			is_auth: -1
		},
		is_get_loginInfo: false,
		business_id: 0,
		is_login: false,
		token: '',
		env: '',
		mineRefresh: false, //刷新我的页面
		applyCurrentActivity: {}, //当前报名的活动信息
		currentChangeVideo: {}, //当前选择的上传视频信息
		currentWatchDiPloma: '', //当前查看的证书图片
		shareVideoInfo: {} //分享视频信息
	},
	onLaunch: function () {
		clearToken();
		clearMatchId();
		this.handleLogin();
		this.getNavBarInfo();
		this.setBaseConfig();
		this.loadFontFace();
	},
	onShow: function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	},
	methods: {
		// 基础设置
		setBaseConfig() {
			const env = uni.getAccountInfoSync();
			let envVersion = env.miniProgram.envVersion;
			config.env = envVersion;
			this.globalData.env = envVersion;
			switch (envVersion) {
				case 'develop':
					config.company_id = 446;
					config.baseUrl = 'https://apitest.wesais.cn';
					break;
				case 'trial':
					config.company_id = 446;
					config.baseUrl = 'https://apitest.wesais.cn';
					break;
				case 'release':
					config.company_id = 533;
					config.baseUrl = 'https://api.wesais.com';
					break;
			}
		},
		// 菜单按钮的布局位置信息
		getNavBarInfo() {
			const systemInfo = uni.getSystemInfoSync();
			if (systemInfo.system && systemInfo.system.indexOf('Android') > -1) {
				this.globalData.isIos = false;
			} else {
				this.globalData.isIos = true;
				config.isIos = true;
			}
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
			this.globalData.menuWidth = menuButtonInfo.width;
			this.globalData.menuTop = menuButtonInfo.top;
			this.globalData.menuHeight = menuButtonInfo.height;
			this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
		},
		// 加载字体
		loadFontFace() {
			uni.loadFontFace({
				global: true,
				family: 'YouSheBiaoTiHei',
				source: 'https://cdn-static.papa.com.cn/ppcs_mp/YouSheBiaoTiHei-2.ttf',
				scopes: ['webview', 'native'],
				success: function (e) {
					// console.log('字体加载成功', e);
				},
				fail: function (e) {
					console.log('字体加载失败', e);
				}
			});
		},
		// 登录 获取token
		handleLogin() {
			return new Promise((resolve, reject) => {
				login()
					.then(async (res) => {
						if (res.code === 200) {
							await setMatchId(res.data.match_id);
							this.globalData.is_get_loginInfo = true;
							this.globalData.isAuth = res.data.is_authenticate === -1 ? false : true;
							let userInfo = {
								phone: res.data.phone,
								nick_name: res.data.nick_name,
								name: res.data.name,
								avatar_url: res.data.avatar_url,
								is_auth: res.data.is_authenticate
							};
							this.globalData.business_id = res.data.business_id;
							this.globalData.userInfo = userInfo;
							this.globalData.is_login = true;
							this.globalData.token = res.data.token;
							setToken(res.data.token, true).then((c) => {});
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							});
						}
						resolve(res);
					})
					.catch((error) => {
						console.log('errror', error);
						reject(error);
						uni.showToast({
							title: '登录获取token失败',
							icon: 'none'
						});
					});
			});
		},
		setUserInfo(obj) {
			for (const key in this.globalData.userInfo) {
				if (Object.hasOwnProperty.call(obj, key)) {
					this.globalData.userInfo[key] = obj[key];
				}
			}
		},
		//根据用户登录状态进行判断
		judgeIsAuth() {
			return new Promise(async (resolve) => {
				let isAuth = -1;
				if (this.globalData.is_login) {
					isAuth = this.globalData.userInfo.is_auth;
				} else {
					await this.handleLogin();
					isAuth = this.globalData.userInfo.is_auth;
				}
				if (isAuth < 0) {
					isAuth = parseInt(isAuth, 10);
					const message = '请先进行登录';
					const confirmText = isAuth == -1 ? '去登录' : '去认证';
					const url = '/pages/login/index';
					uni.showModal({
						cancelText: '取消',
						confirmText: confirmText,
						title: message,
						success(e) {
							if (e.confirm) {
								uni.redirectTo({
									url: url
								});
							}
							if (e.cancel) {
								console.log('取消');
							}
						}
					});
					resolve(false);
					return;
				}
				resolve(true);
			});
		}
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import url('./styles/common.scss');
@import url('./styles/iconfont.css');
</style>
