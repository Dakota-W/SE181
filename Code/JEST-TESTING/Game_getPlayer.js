function getPlayer(color) {
        var Turn = color;
        var check = false;
        var RoomCode = null;
        var Timer = null;
        var User = "Red";
        if (Turn == "Red") {
            var String = "It is currently <mark class='red'><u><b>" + Turn + "'s</b></u></mark> turn.";
        } else if (Turn == "Black") {
            var String = "It is currently <u><b>" + Turn + "'s</b></u> turn.";
        } else {
            var String = "no color";
        }
        return String;
    }

module.exports = getPlayer