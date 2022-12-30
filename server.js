const express = require('express');
const app = express();
const server =require('http').createServer(app);
const {Server} = require("socket.io")

const io = new Server(server, {cors: {origin: "*"}})


app.get('/', (req, res)=>{
	res.send("Hello World!!!");
})

// connecting the socket
io.on('connect', (socket) => {
	socket.on('msg', e => io.emit('newMsg', e))
})

server.listen(5000, ()=>{
	console.log("listening on other side")
})
