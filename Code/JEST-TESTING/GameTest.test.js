const getPlayer = require('./Game_getPlayer');
const ResetTimer = require('./Game_ResetTimer');
const move = require('./Game_move')
const take = require('./Game_take')
const setSession = require('./Game_setSession')
const setUser = require('./Game_setUser');
const displayTimer = require('./Game_displayTimer');


test('GetPlayer() Red Turn', () => {
    expect(getPlayer("Red")).toBe("It is currently <mark class='red'><u><b>Red's</b></u></mark> turn.");
});

test('GetPlayer() Black Turn', () => {
    expect(getPlayer("Black")).toBe("It is currently <u><b>Black's</b></u> turn.");
});

test('GetPlayer() Null', () => {
    expect(getPlayer("")).toBe("no color");
});

test('ResetTimer() Object Type', () => {
    expect(typeof ResetTimer()).toBe("object");
});

test('move() Red Move', () => {
    expect(move("Red")).toBe("Red moved, new turn is now Black")
})

test('move() Black Move', () => {
    expect(move("Black")).toBe("Black moved, new turn is now Red")
})

test('move() Null', () => {
    expect(move("")).toBeNull()
})

test('take() Red', () => {
    expect(take("Red")).toBe("Red took Black")
})

test('take() Black', () => {
    expect(take("Black")).toBe("Black took Red")
})

test('take() Null', () => {
    expect(take("")).toBeNull()
})

test('setSession() length', () => {
    expect(setSession().length).toBe(5)
})

test('setUser() Red', () => {
    expect(setUser("Red")).toBe("You are the <mark class='red'><u><b>Red</b></u></mark> Player.")
})

test('setUser() Black', () => {
    expect(setUser("Black")).toBe("You are the <u><b>Black</b></u> Player.")
})

test('setUser() Invalid Color', () => {
    expect(setUser("pink")).toBe("no color")
})

test('setUser() Invalid Color', () => {
    expect(setUser("pink")).toBe("no color")
})

test('displayTimer() Red and code 123ab', () => {
    expect(displayTimer("Red","123ab")).toBe("0h 4m 59s ")
})

test('displayTimer() Black and code 123ab', () => {
    expect(displayTimer("Black","123ab")).toBe("NaNh NaNm NaNs ")
})

