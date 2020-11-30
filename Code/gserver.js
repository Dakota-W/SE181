const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./game.db', (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Connected to the SQLite db');
});

// let sql = `SELECT * FROM gameInfo`;

// db.all(sql, [], (err, rows) => {
//     if (err) {
//         throw err;
//     }
//     rows.forEach((row) => {
//         console.log(row.gameID);
//     });
// });

const update = `REPLACE INTO gameInfo(gameID, gameHTML, turnVar, checkVar) values (?,?,?,?)`;

const create = `INSERT INTO game (gameID) values (?)`;

app.use(express.static('.'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// function getTurnVar(roomCode){
//     db.get(`SELECT turnVar FROM game WHERE gameID = (?)`, [roomCode], (err, row) =>{
//         return row;
//     });
// }

// function getCheckVar(roomCode){
//     db.get(`SELECT checkVar FROM game WHERE gameID = (?)`, [roomCode], (err, row) =>{
//         return row;
//     });
// }

io.on('connection', (socket) => {
  // console.log('a user connected');
  // console.log(socket.id)
  // socket.on('disconnect', () =>{
  //     console.log('user disconnected');
  // });
  socket.on('gameID', (gameID) => {
    db.run(create, [gameID], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with this rowid ${this.lastID}`);
    });
  });
  socket.on('board', (board, roomCode) => {
    console.log(roomCode);
    db.run(update, [roomCode, board[0], board[1], board[2]], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been updated with this rowid ${this.lastID}`);
    });
    io.in(roomCode).emit('board', board);
  });
  // socket.on('globals', (globals, roomCode) => {
  //     console.log(globals);
  //     io.in(roomCode).emit('globals', globals);
  // });

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

  socket.on('join', function(roomCode, reqCode) {
    const Room = io.sockets.adapter.rooms.get(roomCode);
    if (((Room == null) || ((Room).size != 2))) {
      socket.join(roomCode);
      console.log('Joined');
      console.log(socket.rooms);
      console.log(io.sockets.adapter.rooms);
      io.emit(reqCode, 'connect');
    } else {
      console.log('Full');
      io.emit(reqCode, 'Room Full');
    }
  });

  socket.on('setPlayer', function(roomCode) {
    const Room = io.sockets.adapter.rooms.get(roomCode);
    if (Room.player1 == null) {
      Room.player1 = socket.id;
    } else if (Room.has(Room.player1) == false) {
      Room.player1 = socket.id;
    } else if (Room.player2 == null) {
      Room.player2 = socket.id;
    } else if (Room.has(Room.player2) == false) {
      Room.player2 = socket.id;
    }
  });

  socket.on('getPlayer', function(roomCode, reqCode) {
    const Room = io.sockets.adapter.rooms.get(roomCode);
    if (Room.player1 == socket.id) {
      console.log('Red');
      io.emit(reqCode, 'Red');
    } else if (Room.player2 == socket.id) {
      console.log('Black');
      io.emit(reqCode, 'Black');
    }
  });
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
