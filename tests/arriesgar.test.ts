import {Game} from "../src/main";

const game = new Game();
game.setWord("perro");

test('Acierta la palabra', function () {
    expect(game.guessWord("perro")).toBe(true);
});

test('No acierta la palabra', function () {
    expect(game.guessWord("casa")).toBe(false);
});

