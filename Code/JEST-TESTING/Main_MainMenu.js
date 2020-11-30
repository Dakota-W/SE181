function MainMenu(button){
    if(button == "C"){
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var generatedResult = '';
        for ( var i = 0; i < 5; i++ ) {
          generatedResult += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return generatedResult; 
    }
    else if(button == "J") {
        return "Join.html";       
    }
    else if (button == "I"){
        return "Instructions.html";
    }
}

module.exports = MainMenu