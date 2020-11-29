var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const fs = require('fs');

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

app.get('/createGame', (req, res) => {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var generatedResult = '';
    for ( var i = 0; i < 5; i++ ) {
      generatedResult += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    console.log(generatedResult)
    // console.log(process.cwd())
    var dir = process.cwd()+'\\Sessions\\'+generatedResult;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
  
    fs.copyFile(process.cwd()+'/Game.html', './Sessions/'+generatedResult+"/Game.html", (err) => {
      if (err) 
          throw err;
      console.log('Game.html was copied');
    });
  
    fs.copyFile(process.cwd()+'/Game.js', './Sessions/'+generatedResult+"/Game.js", (err) => {
      if (err) 
          throw err;
      console.log('Game.js was copied');
    });
    res.send(generatedResult)
  });

http.listen(3000, () => {
    console.log('listening on *:3000');
});