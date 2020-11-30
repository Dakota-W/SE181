function declareWinner(W){
    if (W == "Red") {
        var String = "<mark class='red'><u><b>" + W + "</b></u></mark> Wins.";
    } else if (W == "Black") {
        var String = "<u><b>" + W + "</b></u> Wins";
    }
    return String
}

module.exports = declareWinner