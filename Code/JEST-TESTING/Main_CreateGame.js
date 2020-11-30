function createGame(code){
    var generatedResult = code
    var result = ""
    if (code == "") {
        result = null;
    } else {
        result = "Game.html?roomCode="+generatedResult;
    }

    return result
}

module.exports = createGame