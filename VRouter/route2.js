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
	}
	// 监听页面变化加载
	addEventListeneRoute() {
		// 页面加载完
		window.addEventListener('load', this.updateView.bind(this))
		window.addEventListener('hashchange', this.updateView.bind(this), false)
	}
	// 路由渲染
	updateView() {
		let currentUrl = location.hash.slice(1)|| '/'    // hash模式 location.hash.slice(1)
		if(!this.routes[currentUrl]) currentUrl="/"
		this.routes[currentUrl]()
	}
}
