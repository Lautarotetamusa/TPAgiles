import {Game} from "../src/main";

const game = new Game();
game.setWord("perro");

test('La palabra contiene la leta', function () {
    expect(game.guessLetter('e')).toBe(true);
    expect(game.alreadyGuessed('e')).toBe(true);
});

test('La palabra NO contiene la leta', function () {
    expect(game.guessLetter('a')).toBe(false);
    expect(game.alreadyGuessed('a')).toBe(true);
});

test('Se puede arriesgar la letra en mayusculas', function () {
    expect(game.guessLetter('O')).toBe(true);
    expect(game.getCoincidences().at(4)).toBe(true);
    expect(game.alreadyGuessed('o')).toBe(true);
});

test('Se puede arriesgar una letra con tilde', function () {
    const g = new Game();
    g.setWord("Opción");
    expect(g.word).toBe("opcion");

    expect(g.guessLetter('O')).toBe(true);
    expect(g.getCoincidences().at(0)).toBe(true);
    expect(g.getCoincidences().at(4)).toBe(true);
    expect(g.alreadyGuessed('o')).toBe(true);
});

test('La letra ya fue arriesgada', function () {
    game.guessLetter('u');
    expect(game.alreadyGuessed('u')).toBe(true);
});

test('Si arriesgamos una letra que ya fue arriesgada no descontamos puntos', function () {
    const lifes = game.getLifes();
    game.guessLetter('i');
    game.guessLetter('i');
    expect(game.getLifes()).toBe(lifes - 1);
});

test('Si arriesgamos una letra que ya fue arriesgada no agregamos a guesses', function () {
    const guesses = game.getGuesses().length;
    game.guessLetter('n');
    game.guessLetter('n');
    expect(game.getGuesses().length).toBe(guesses + 1);
});

test('No se pueden arriesgar numeros', function(){
    const guesses = game.getGuesses().length;
    const coincidences = game.getCoincidences();
    game.guessLetter('9');
    expect(game.getGuesses().length).toBe(guesses);
    expect(game.getGuesses()).not.toContain('9');
    expect(game.getCoincidences()).toStrictEqual(coincidences);
});

test('No se pueden arriesgar simbolos', function(){
    const guesses = game.getGuesses().length;
    const coincidences = game.getCoincidences();
    game.guessLetter('[');
    expect(game.getGuesses().length).toBe(guesses);
    expect(game.getGuesses()).not.toContain('[');
    expect(game.getCoincidences()).toStrictEqual(coincidences);
});
