var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static("."));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () =>{
        console.log('user disconnected');
    });
    socket.on('board', (board) => {
        console.log("received");
        io.emit('board', board);
    });
    socket.on('globals', (globals) => {
        console.log(globals);
        io.emit('globals', globals);
    });
});


http.listen(3000, () => {
    console.log('listening on *:3000');
});