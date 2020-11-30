function Join(code){
    if (code == "") {
        return null
    }
    var RoomCode = code
    return "Game.html?roomCode="+RoomCode;
}

module.exports = Join