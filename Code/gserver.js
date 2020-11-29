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
    console.log(socket.id)
    socket.on('disconnect', () =>{
        console.log('user disconnected');
    });
    socket.on('board', (board, roomCode) => {
        console.log("received");
        io.in(roomCode).emit('board', board);
    });
    socket.on('globals', (globals, roomCode) => {
        console.log(globals);
        io.in(roomCode).emit('globals', globals);
    });

    // socket.on('create', function(){
    //     var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     var generatedResult = '';
    //     for ( var i = 0; i < 5; i++ ) {
    //       generatedResult += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    //     }
    //     console.log(generatedResult)
    
    //     //Store Room code in SQL
    
    //     socket.join(generatedResult);
    //     console.log(socket.rooms);
    // })

    socket.on('join', function(roomCode,reqCode){
        if (((Room == null) || ((Room).size != 2))){
            socket.join(roomCode)
            console.log("Joined")
            console.log(socket.rooms)
            console.log(io.sockets.adapter.rooms);
            io.emit(roomCode,"connect");
        }
        else{
            console.log("Full")
            io.emit(reqCode,"Room Full");
        }
    })

    socket.on("setPlayer",function(roomCode){
        var Room = io.sockets.adapter.rooms.get(roomCode)
        if (Room.player1 == null){
            console.log("Player 1 set")
            Room.player1 = socket.id
        }
        else if (socketList[Room.player1] == null){
            console.log("Player 1 reset")
            Room.player1 = socket.id
        }
        else if(Room.player2 == null){
            console.log("Player 2 set")
            Room.player2 = socket.id
        }
        else if (socketList[Room.player2] == null){
            console.log("Player 2 reset")
            Room.player2 = socket.id
        }
    })

    socket.on("getPlayer",function(roomCode, reqCode){
        if (Room.player1 == socket.id){
            console.log("Red")
            io.emit(reqCode, "Red")
        }
        else if (Room.player2 == socket.id){
            console.log("Black")
            io.emit(reqCode, "Black")
        }
    })
});

// app.get('/createGame', (req, res) => {
//     var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var generatedResult = '';
//     for ( var i = 0; i < 5; i++ ) {
//       generatedResult += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
//     }
//     console.log(generatedResult)
//     var dir = './Sessions/'+generatedResult;
//     if (!fs.existsSync(dir)){
//         fs.mkdirSync(dir);
//     }
  
//     fs.copyFile('./CleanGame/Game.html', './Sessions/'+generatedResult+"/Game.html", (err) => {
//       if (err) 
//           throw err;
//       console.log('Game.html was copied');
//     });
  
//     fs.copyFile('./CleanGame/Game.js', './Sessions/'+generatedResult+"/Game.js", (err) => {
//       if (err) 
//           throw err;
//       console.log('Game.js was copied');
//     });
//     res.send(generatedResult)
//   });


http.listen(3000, () => {
    console.log('listening on *:3000');
});