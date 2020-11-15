function MainMenu(button){
    if(button == "C"){
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
