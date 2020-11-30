const mainMenu = require('./Main_MainMenu');
const declareWinner = require('./Main_declareWinner');
const Join = require('./Main_Join');
const createGame = require ('./Main_createGame')
const Rematch = require('./Main_Rematch');

test('MainMenu() Create', () => {
    expect(mainMenu("C").length).toBe(5)
})

test('MainMenu() Join', () => {
    expect(mainMenu("J")).toBe("Join.html")
})

test('MainMenu() Instructions', () => {
    expect(mainMenu("I")).toBe("Instructions.html")
})

test('declareWinner() Red', () => {
    expect(declareWinner("Red")).toBe("<mark class='red'><u><b>Red</b></u></mark> Wins.")
})

test('declareWinner() Black', () => {
    expect(declareWinner("Black")).toBe("<u><b>Black</b></u> Wins")
})

test('Join() Join Room', () => {
    expect(Join("bc5hd")).toBe("Game.html?roomCode=bc5hd")
})

test('Join() Join Null', () => {
    expect(Join("")).toBeNull()
})

test('createGame() Create Room', () => {
    expect(createGame("bc5hd")).toBe("Game.html?roomCode=bc5hd")
})

test('createGame() Create Null', () => {
    expect(createGame("")).toBeNull()
})

test('Rematch() connect', () => {
    expect(Rematch("connect").includes("Game.html?roomCode=")).toBe(true)
})

test('Rematch() index', () => {
    expect(Rematch("no")).toBe("index.html")
})