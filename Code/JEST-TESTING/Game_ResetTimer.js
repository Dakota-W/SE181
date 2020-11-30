function ResetTimer() {
    var CurTime = new Date()
    Timer = new Date(CurTime.getTime() + 300000)
    return Timer;
}


module.exports = ResetTimer