export default {
	data() {
		return {
			list: [],
			page: 1,
			count: 0,
			loading: false,
			finished: false
		}
	},
	computed: {
		loadStatus() {
			if (this.finished) {
				return 'no-more'
			} else {
				if (this.loading) {
					return 'loading'
				} else {
					return "more"
				}
			}
		},
		showSkeleton() {
			if (this.list.length == 0 && !this.finished && this.loading) {
				return true
			}
		},
		showEmpty() {
			if (this.list.length == 0 && this.finished && !this.loading) {
				return true
			}
		}
	},
	methods: {
		loadMore() {
			console.log('触底加载')
			if (this.finished) {
				console.log('加载完成')
				this.loading = false
				return
			}
			this.page = this.page + 1
			this.getList()
		},
		resetData() {
			this.finished = false
			this.loading = false
			this.page = 1
			this.list = []
			this.$nextTick(() => {
				this.getList()
			})
		}
	}
}