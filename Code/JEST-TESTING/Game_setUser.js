function setUser(User) {

    if (User == "Red") {
        var String = "You are the <mark class='red'><u><b>" + User + "</b></u></mark> Player.";
    } else if (User == "Black") {
        var String = "You are the <u><b>" + User + "</b></u> Player.";
    } else {
        var String = "no color";
    }
    return String;
}

module.exports = setUser