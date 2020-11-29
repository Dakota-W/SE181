var Turn = "Red";
var check = false;
var socket = io();
var RoomCode = null;
var Timer = null;
var User = "Red";

function getPlayer() {
    //Node.js Here to set Player Number
    if (Turn == "Red") {
        var String = "It is currently <mark class='red'><u><b>" + Turn + "'s</b></u></mark> turn.";
    } else if (Turn == "Black") {
        var String = "It is currently <u><b>" + Turn + "'s</b></u> turn.";
    }
    document.getElementById("Turn").innerHTML = String;
}

function start() {
    ResetTimer()
    setSession()
    getPlayer()
    sendMove()
}

function setSession() {
    let URL = window.location.search;
    let Params = new URLSearchParams(URL);
    RoomCode = Params.get('roomCode')
    document.getElementById("roomCode").innerHTML = RoomCode

    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var generatedResult = '';
    for ( var i = 0; i < 5; i++ ) {
      generatedResult += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    
    socket.emit('join', RoomCode,generatedResult);
   
    socket.on(generatedResult, function (message) {
        if (message == "connect"){
            nulll
        }
        else{
            alert(message);
            window.location = "index.html";
        }
    });
    setUser(generatedResult+"1")
    sendMove()
}

function setUser(reqCode){
    socket.emit("setPlayer", RoomCode);

    socket.emit("getPlayer", RoomCode, reqCode);

    socket.on(reqCode, function (Color) {

        User = Color

        if (User == "Red") {
            var String = "You are the <mark class='red'><u><b>" + User + "</b></u></mark> Player.";
        } else if (User == "Black") {
            var String = "You are the <u><b>" + User + "</b></u> Player.";
        }
    
        document.getElementById("Player").innerHTML = String
    })
}

function ResetTimer(){
    var CurTime = new Date()
    Timer = new Date(CurTime.getTime() + 300000)
}

function checkMoves(LastMove = false) {
    getPlayer();

    if (check == false) {
        check = true;
        if (Turn == "Red") {
            document.querySelectorAll(".red_piece").forEach(function (x) {
                displayMoves(x);
            })
            document.querySelectorAll('.white_circle').forEach(function (x) {
                x.remove();
            })
        }
        if (Turn == "Black") {
            document.querySelectorAll(".black_piece").forEach(function (x) {
                displayMoves(x);
            })
            document.querySelectorAll('.white_circle').forEach(function (x) {
                x.remove();
            })
        }
    }


    //Checking if piece can be king'd
    document.querySelectorAll(".red_piece").forEach(function (x) {
        var Position = x.parentNode.id
        var curRow = parseInt(String(Position).charAt(0));
        if (curRow == 7) {
            x.innerHTML = "K"
        }
    })
    document.querySelectorAll(".black_piece").forEach(function (x) {
        var Position = x.parentNode.id
        var curRow = parseInt(String(Position).charAt(0));
        if (curRow == 0) {
            x.innerHTML = "K"
        }
    })

    //Win condition
    if (LastMove == true) {
        if (document.querySelector(".black_piece") == null) {
            window.location = 'Rematch.html?roomCode=' + RoomCode + "&Winner=Red";
        } else if (document.querySelector(".red_piece") == null) {
            window.location = 'Rematch.html?roomCode=' + RoomCode + "&Winner=Black";
        }
    }
    sendMove();
}

function displayMoves(element, repeatAttack = false) {
    //Removes all white circles
    document.querySelectorAll('.white_circle').forEach(function (x) {
        x.remove();
    })

    var Position = element.parentNode.id; //This is the coordinates from parent div
    var type = element.innerHTML; //King or Not
    var curRow = parseInt(String(Position).charAt(0));
    var curCol = parseInt(String(Position).charAt(2));
    if ((String(element.className).includes(Turn.toLowerCase())) && User == Turn) {
        if (type == "K") {
            let Moves = [];
            let possibleMoves = [];
            let possibleAttacks = [];
            let oppPosition = []
            Moves.push([curRow - 1, curCol + 1]);
            Moves.push([curRow + 1, curCol + 1]);
            Moves.push([curRow - 1, curCol - 1]);
            Moves.push([curRow + 1, curCol - 1]);
            Moves.forEach(function (item) {
                let row = item[0];
                let col = item[1];
                if (!(row < 0 | row > 7 | col < 0 | col > 7)) {
                    let pos = row.toString() + "," + col.toString();
                    let square = document.getElementById(pos);
                    if (!square.childNodes.length > 0) {
                        possibleMoves.push(square);
                    } else {
                        if (element.className == "red_piece") {
                            if (square.firstChild.className == "black_piece") {
                                let opp_piece = square.firstChild;
                                let oppPos = opp_piece.parentNode.id;
                                let oppRow = parseInt(String(oppPos).charAt(0));
                                let oppCol = parseInt(String(oppPos).charAt(2));
                                let rowDiff = curRow - oppRow;
                                let colDiff = curCol - oppCol;

                                let new_oppRow = oppRow - (rowDiff);
                                let new_oppCol = oppCol - (colDiff);
                                if (!(new_oppRow < 0 | new_oppRow > 7 | new_oppCol < 0 | new_oppCol > 7)) {
                                    let newPos = new_oppRow.toString() + "," + new_oppCol.toString();
                                    let newSquare = document.getElementById(newPos);

                                    if (!(newSquare.childNodes.length > 0) || newSquare.firstChild.className == "blue_circle") {
                                        possibleAttacks.push(newSquare);
                                        oppPosition.push(oppPos);
                                    }
                                }
                            }

                        } else if ((element.className == "black_piece")) {
                            if (square.firstChild.className == "red_piece") {
                                let opp_piece = square.firstChild;
                                let oppPos = opp_piece.parentNode.id;
                                let oppRow = parseInt(String(oppPos).charAt(0));
                                let oppCol = parseInt(String(oppPos).charAt(2));
                                let rowDiff = curRow - oppRow;
                                let colDiff = curCol - oppCol;

                                let new_oppRow = oppRow - (rowDiff);
                                let new_oppCol = oppCol - (colDiff);
                                if (!(new_oppRow < 0 | new_oppRow > 7 | new_oppCol < 0 | new_oppCol > 7)) {
                                    let newPos = new_oppRow.toString() + "," + new_oppCol.toString();
                                    let newSquare = document.getElementById(newPos);

                                    if (!(newSquare.childNodes.length > 0) || newSquare.firstChild.className == "blue_circle") {
                                        possibleAttacks.push(newSquare);
                                        oppPosition.push(oppPos);
                                    }
                                }
                            }
                        }
                    }
                }
            })
            if (possibleAttacks.length > 0) {
                possibleAttacks.forEach(function (item, index) {
                    var div = document.createElement("div");
                    div.className = "blue_circle"
                    div.id = Position;
                    div.setAttribute("opp_piece_pos", oppPosition[index]);
                    div.setAttribute("onclick", "take(this)");
                    item.append(div);
                    if (element.className == "black_piece") {
                        element.className = "black_piece_attk"
                    } else if (element.className == "red_piece") {
                        element.className = "red_piece_attk"
                    }
                })
            } else if (repeatAttack == false && document.getElementsByClassName("blue_circle").length == 0) {
                possibleMoves.forEach(function (item) {
                    //Create white circle div
                    var div = document.createElement("div");
                    div.className = "white_circle"
                    div.id = Position;
                    div.setAttribute("onclick", "move(this)");
                    item.append(div);
                })
            }
        } else {
            if (element.className == "red_piece") {
                let Moves = [];
                let possibleMoves = [];
                let possibleAttacks = [];
                let oppPosition = []
                Moves.push([curRow + 1, curCol + 1]);
                Moves.push([curRow + 1, curCol - 1]);
                Moves.forEach(function (item) {
                    let row = item[0];
                    let col = item[1];
                    if (!(row < 0 | row > 7 | col < 0 | col > 7)) {
                        let pos = row.toString() + "," + col.toString();
                        let square = document.getElementById(pos);
                        if (!square.childNodes.length > 0) {
                            possibleMoves.push(square);
                        } else {
                            if (square.firstChild.className == "black_piece") {
                                let opp_piece = square.firstChild;
                                let oppPos = opp_piece.parentNode.id;
                                let oppRow = parseInt(String(oppPos).charAt(0));
                                let oppCol = parseInt(String(oppPos).charAt(2));
                                let rowDiff = curRow - oppRow;
                                let colDiff = curCol - oppCol;

                                let new_oppRow = oppRow - (rowDiff);
                                let new_oppCol = oppCol - (colDiff);

                                if (!(new_oppRow < 0 | new_oppRow > 7 | new_oppCol < 0 | new_oppCol > 7)) {
                                    let newPos = new_oppRow.toString() + "," + new_oppCol.toString();
                                    let newSquare = document.getElementById(newPos);

                                    if (!(newSquare.childNodes.length > 0) || newSquare.firstChild.className == "blue_circle") {
                                        possibleAttacks.push(newSquare);
                                        oppPosition.push(oppPos);
                                    }
                                }
                            }
                        }
                    }
                })
                if (possibleAttacks.length > 0) {
                    possibleAttacks.forEach(function (item, index) {
                        var div = document.createElement("div");
                        div.className = "blue_circle"
                        div.id = Position;
                        div.setAttribute("opp_piece_pos", oppPosition[index]);
                        div.setAttribute("onclick", "take(this)");
                        item.append(div);
                        if (element.className == "black_piece") {
                            element.className = "black_piece_attk"
                        } else if (element.className == "red_piece") {
                            element.className = "red_piece_attk"
                        }
                    })
                } else if (repeatAttack == false && document.getElementsByClassName("blue_circle").length == 0) {
                    possibleMoves.forEach(function (item) {
                        //Create white circle div
                        var div = document.createElement("div");
                        div.className = "white_circle"
                        div.id = Position;
                        div.setAttribute("onclick", "move(this)");
                        item.append(div);
                    })
                }
            } else if (element.className == "black_piece") {
                let Moves = [];
                let possibleMoves = [];
                let possibleAttacks = [];
                let oppPosition = []
                Moves.push([curRow - 1, curCol + 1]);
                Moves.push([curRow - 1, curCol - 1]);
                Moves.forEach(function (item) {
                    let row = item[0];
                    let col = item[1];
                    if (!(row < 0 | row > 7 | col < 0 | col > 7)) {
                        let pos = row.toString() + "," + col.toString();
                        let square = document.getElementById(pos);
                        if (!square.childNodes.length > 0) {
                            possibleMoves.push(square);
                        } else {
                            if (square.firstChild.className == "red_piece") {
                                let opp_piece = square.firstChild;
                                let oppPos = opp_piece.parentNode.id;
                                let oppRow = parseInt(String(oppPos).charAt(0));
                                let oppCol = parseInt(String(oppPos).charAt(2));
                                let rowDiff = curRow - oppRow;
                                let colDiff = curCol - oppCol;

                                let new_oppRow = oppRow - (rowDiff);
                                let new_oppCol = oppCol - (colDiff);
                                if (!(new_oppRow < 0 | new_oppRow > 7 | new_oppCol < 0 | new_oppCol > 7)) {
                                    let newPos = new_oppRow.toString() + "," + new_oppCol.toString();
                                    let newSquare = document.getElementById(newPos);

                                    if (!(newSquare.childNodes.length > 0) || newSquare.firstChild.className == "blue_circle") {
                                        possibleAttacks.push(newSquare);
                                        oppPosition.push(oppPos);
                                    }
                                }
                            }
                        }
                    }
                })
                if (possibleAttacks.length > 0) {
                    possibleAttacks.forEach(function (item, index) {
                        var div = document.createElement("div");
                        div.className = "blue_circle"
                        div.id = Position;
                        div.setAttribute("opp_piece_pos", oppPosition[index]);
                        div.setAttribute("onclick", "take(this)");
                        item.append(div);
                        if (element.className == "black_piece") {
                            element.className = "black_piece_attk"
                        } else if (element.className == "red_piece") {
                            element.className = "red_piece_attk"
                        }
                    })
                } else if (repeatAttack == false && document.getElementsByClassName("blue_circle").length == 0) {
                    possibleMoves.forEach(function (item) {
                        //Create white circle div
                        var div = document.createElement("div");
                        div.className = "white_circle"
                        div.id = Position;
                        div.setAttribute("onclick", "move(this)");
                        item.append(div);
                    })
                }
            }
        }
    }
}

function move(element) {
    var curPos = element.parentNode.id; //This is the coordinates from parent div

    var oriPos = element.id //Coordinates of Original Piece

    //Removes all white circles
    document.querySelectorAll('.white_circle').forEach(function (x) {
        x.remove()
    })

    document.getElementById(curPos).appendChild(document.getElementById(oriPos).firstChild)

    //set turn
    if (Turn == "Red") {
        Turn = "Black";
        check = false;
        ResetTimer();
    } else if (Turn == 'Black') {
        Turn = "Red"
        check = false;
        ResetTimer();
    }
    checkMoves(true)
}

function take(element) {
    var curPos = element.parentNode.id; //This is the coordinates from parent div
    var oppPos = element.getAttribute("opp_piece_pos") //Coordinates of Piece being taken
    var oriPos = element.id //Coordinates of Original Piece

    //Removes all blue circles
    document.querySelectorAll('.blue_circle').forEach(function (x) {
        x.remove()
    })

    document.querySelectorAll('.black_piece_attk').forEach(function (x) {
        x.className = "black_piece"
    })

    document.querySelectorAll('.red_piece_attk').forEach(function (x) {
        x.className = "red_piece"
    })

    document.getElementById(oppPos).firstChild.remove()

    document.getElementById(curPos).appendChild(document.getElementById(oriPos).firstChild)

    displayMoves(document.getElementById(curPos).firstChild, true);
    if (document.querySelector(".blue_circle") != null) {
        displayMoves(document.getElementById(curPos).firstChild, true)
    } else {
        if (Turn == "Red") {
            Turn = "Black";
            check = false;
            elementSet = false;
            ResetTimer()
        } else if (Turn == 'Black') {
            Turn = "Red";
            check = false;
            elementSet = false;
            ResetTimer()
        }
        checkMoves(true)
    }
}

function sendMove() {
    var boardState = document.getElementById("gameboard").innerHTML;

    socket.emit('board', [boardState, Turn, check], RoomCode);
    socket.on('board', function(board){
        console.log("received");
        document.getElementById("gameboard").innerHTML = board[0];
        Turn = globals[1];
        check = globals[2];
        getPlayer();
    });
}

function displayTimer() {
    // Set start time
    //var startTime = new Date();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get current time
        var currentTime = new Date().getTime();

        // Find the time difference
        var timeDifference = Timer - currentTime;
        if (timeDifference <= 0){
            if (Turn == "Black") {
                window.location = 'Rematch.html?roomCode=' + RoomCode + "&Winner=Red";
            } else if (Turn == "Red") {
                window.location = 'Rematch.html?roomCode=' + RoomCode + "&Winner=Red";
            }
        }

        // Time calculations for hours, minutes and seconds
        var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Output timer
        document.getElementById("Timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    }, 1000);
}<<<<<<< HEAD
=======

    socket.emit('board', [boardState, Turn, check], RoomCode);
    socket.on('board', function(board){
        console.log("received");
        document.getElementById("gameboard").innerHTML = board[0];
        Turn = globals[1];
        check = globals[2];
>>>>>>> vq
