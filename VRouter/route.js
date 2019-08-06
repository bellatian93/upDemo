class VRouter {
	constructor(routesArr){
		// 路由表声明
		this.routes = {}
		// 添加路由表
		routesArr.forEach(item =>{
			this.routes[item.path] = () => {
				document.getElementById('content').innerHTML = item.component
			}
		})
		// 添加路由监听
		this.addEventListeneRoute();
		window.addEventListener('popstate', this.updateView.bind(this), false)

		// 超链接绑定时间
		this.bindEvent()
	}
	// 监听页面变化加载
	addEventListeneRoute() {
		// 页面加载完
		window.addEventListener('load', this.updateView.bind(this))
		window.addEventListener('popState', this.updateView.bind(this), false)
	}
	// 路由渲染
	updateView() {
		console.log("触发了")
		let currentUrl = window.location.pathname|| '/'    // hash模式 location.hash.slice(1)
		if(!this.routes[currentUrl]) currentUrl="/"
		this.routes[currentUrl]()
	}
	// 为超链接绑定事件
	bindEvent() {
		const _this = this
		const links = document.getElementsByTagName('a');
		[].forEach.call(links,item=>{
			item.addEventListener('click', function () {
				const url = this.getAttribute('data-href')
				if(url) _this.push(url)
			})
		})
	}
	// 路由跳转
	push(url) {
		window.history.pushState({},null, url)
		this.updateView()
	}

}
