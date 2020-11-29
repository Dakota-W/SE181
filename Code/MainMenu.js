var script = document.createElement('script');
var socket = io();
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function MainMenu(button){
    if(button == "C"){
        createGame();   
    }
    else if(button == "J") {
        window.location="Join.html";       
    }
    else if (button == "I"){
        window.location="Instructions.html";
    }
}

function Join(){
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var generatedResult = '';
    for ( var i = 0; i < 5; i++ ) {
      generatedResult += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    var RoomCode = document.getElementById("RoomCode").value;
    socket.emit('join',RoomCode, generatedResult);
    

    socket.on(generatedResult, function (message) {
        if (message == "connect"){
            window.location = "Game.html?roomCode="+RoomCode;
        }
        else{
            alert(message);
        }
    });
}

function createGame() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var generatedResult = '';
        for ( var i = 0; i < 5; i++ ) {
          generatedResult += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
    console.log(generatedResult)
    socket.emit('join',generatedResult);
<<<<<<< HEAD
    window.location="Game.html?roomCode="+generatedResult;
=======
    socket.emit('gameID',generatedResult);
>>>>>>> vq
}