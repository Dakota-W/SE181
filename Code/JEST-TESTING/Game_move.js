function move(color) {
    var Turn = color

    var curPos = ""

    var oriPos = color

    curPos = oriPos

    //set turn
    if (Turn == "Red") {
        Turn = "Black";
    } else if (Turn == 'Black') {
        Turn = "Red"
    } else {
        return null
    }

    return curPos + " moved, new turn is now " + Turn
}

module.exports = move