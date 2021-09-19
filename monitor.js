const config = require('./config')
const Collection = require('@discordjs/collection').Collection;
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = class Monitor {
	constructor() {
    this._collection = new Collection()
		  
	}
	ready() {
         const allUrls = config.links;

		 allUrls.forEach(url => {
			 const obj = {
				siteName: url.siteName ? url.siteName : url.url.replace('https://', '').replace('http://', ''),
				url: url.url,
				responseTime: 0,
				state: 'ONLINE',
			 }
			 this._collection.set(url.url, obj)
		 })
           
		this.timer = setInterval(() => {
			this._collection.each(async url => {
				const start = Date.now()
				const r = await this.request(url.url);
			    const elapsed = Date.now() - start
				const obj = {
				   siteName: url.siteName ? url.siteName : url.url.replace('https://', '').replace('http://', ''),
				   url: url.url,
				   responseTime: r ? elapsed : -1,
				   state:  r ? elapsed > config.degradedPerformanceInMs || elapsed > 2000 ? 'DEGRADED' : 'ONLINE' : 'OFFLINE',
				}
				this._collection.set(url.url, obj)
			})
		}, 120000)
	}
	async request(url) {
        const res = await fetch(url).catch(() => null)
		if(!res) return false;
		if(config.links.find(l => l.url == url)?.errorHttpCodes?.includes(res.status)) return false;
		if(!res.ok && config.links.find(l => l.url == url)?.okHttpCodes?.includes(res.status)) return false;
		return true;
	}
}