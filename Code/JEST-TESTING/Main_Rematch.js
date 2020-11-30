function Rematch(message){
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var generatedResult = '';
    for ( var i = 0; i < 5; i++ ) {
      generatedResult += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    if (message == "connect"){
        return "Game.html?roomCode="+generatedResult;
    }
    else{
        return "index.html";
    }
}

module.exports = Rematch