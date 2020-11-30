function take(color) {
    var oppPos = ""
    if (color == "Red") {
        oppPos = "Black"
    } else if (color == "Black") {
        oppPos = "Red"
    } else {
        return null
    }
    var oriPos = color

    return oriPos + " took " + oppPos
}

module.exports = take