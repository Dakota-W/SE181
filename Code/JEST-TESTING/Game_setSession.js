function setSession() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var generatedResult = '';
    for (var i = 0; i < 5; i++) {
        generatedResult += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    return generatedResult;
}

module.exports = setSession