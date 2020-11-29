var script = document.createElement('script');
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function MainMenu(button){
    if(button == "C"){
        createGame();
        window.location="Game.html";   
    }
    else if(button == "J") {
        window.location="Join.html";       
    }
    else if (button == "I"){
        window.location="Instructions.html";
    }
}

function Join(){
    var RoomCode = document.getElementById("RoomCode").value;
    alert(RoomCode);
    //Add Node.JS here
}

function createGame() {
    $.ajax
    ({
        type: "GET",
        url: "http://localhost:3000/createGame",
        success: function(result) {
            alert("success");
        },
        error: function(result) {
            console.log(result)
        }
    });
}