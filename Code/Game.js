function getPlayer() {
    //Node.js Here to set Player Number

    var PlayerNumber = 1;
    var String = "It is currently <var>Player " + PlayerNumber + "'s</var> turn.";
    document.getElementById("Turn").innerHTML = String;
}

function displayMoves(element, repeatAttack = false) {

    //Removes all white circles
    document.querySelectorAll('.white_circle').forEach(function (x) {
        x.remove()
    })
    //Removes all blue circles
    document.querySelectorAll('.blue_circle').forEach(function (x) {
        x.remove()
    })

    var Position = element.parentNode.id; //This is the coordinates from parent div
    var type = element.innerHTML; //King or Not
    var curRow = parseInt(String(Position).charAt(0));
    var curCol = parseInt(String(Position).charAt(2));

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

                                if (!(newSquare.childNodes.length > 0)) {
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

                                if (!(newSquare.childNodes.length > 0)) {
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
            })
        } else if (repeatAttack == false) {
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

                                if (!(newSquare.childNodes.length > 0)) {
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
                })
            } else if (repeatAttack == false) {
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

                                if (!(newSquare.childNodes.length > 0)) {
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
                    div.className = "blue_circle";
                    div.id = Position;
                    div.setAttribute("opp_piece_pos", oppPosition[index]);
                    div.setAttribute("onclick", "take(this)");
                    item.append(div);
                })
            } else if (repeatAttack == false) {
                possibleMoves.forEach(function (item) {
                    //Create white circle div
                    var div = document.createElement("div");
                    div.className = "white_circle";
                    div.id = Position;
                    div.setAttribute("onclick", "move(this)");
                    item.append(div);
                })
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

    //set turn here maybe?
}

function take(element) {
    var curPos = element.parentNode.id; //This is the coordinates from parent div
    var oppPos = element.getAttribute("opp_piece_pos") //Coordinates of Piece being taken
    var oriPos = element.id //Coordinates of Original Piece

    //Removes all blue circles
    document.querySelectorAll('.blue_circle').forEach(function (x) {
        x.remove()
    })

    document.getElementById(oppPos).firstChild.remove()

    document.getElementById(curPos).appendChild(document.getElementById(oriPos).firstChild)
    displayMoves(document.getElementById(curPos).firstChild, true);

    //set turn here maybe?
}

function displayTimer() {
    // Set start time
    var startTime = new Date().getTime();
    
    // Update the count down every 1 second
    var x = setInterval(function() {
    
      // Get current time
      var currentTime = new Date().getTime();
        
      // Find the time difference
      var timeDifference = currentTime - startTime;
        
      // Time calculations for hours, minutes and seconds
      var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
      // Output timer
      document.getElementById("Timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    }, 1000);
}