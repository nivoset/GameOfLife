// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use('/', express.static(__dirname));

server.listen(3000, function () {
  console.log('server up');
});
