const express = require('express');
const server = express();
const config = require('./config.js')
const Monitor = require('./monitor.js')
const monitor = new Monitor()
const path = require('path')

server.use(express.static('public'));


server.get('/', (req, res) => {
 return res.sendFile(path.join(__dirname, './views/status.html'))
});

server.get('/api/status', (req, res) => {
return res.json({ error: false, list: Array.from(monitor._collection.values()) })
});

server.listen(config.port, () => {
	   monitor.ready()
      console.log(`Server started on port ${config.port}`)
})