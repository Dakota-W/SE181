function displayTimer(Turn, RoomCode) {

        var CurTime = new Date()
        varTimer = new Date(CurTime.getTime() + 300000)

        // Get current time
        var currentTime = new Date().getTime();

        // Find the time difference
        var timeDifference = Timer - currentTime;
        if (timeDifference <= 0) {
            if (Turn == "Black") {
                return 'Rematch.html?roomCode=' + RoomCode + "&Winner=Red";
            } else if (Turn == "Red") {
                return 'Rematch.html?roomCode=' + RoomCode + "&Winner=Red";
            }
        }

        // Time calculations for hours, minutes and seconds
        var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Output timer
        Timer = hours + "h " + minutes + "m " + seconds + "s ";
        return Timer;

}

module.exports = displayTimer