const path = require('path');
const { spawnSync } = require('child_process');
const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('add', () => {
  test('2 + 3 = 5', () => expect(add(2, 3)).toBe(5));
  test('números negativos', () => expect(add(-2, -3)).toBe(-5));
  test('positivo com negativo', () => expect(add(5, -8)).toBe(-3));
  test('zero é elemento neutro', () => expect(add(7, 0)).toBe(7));
  test('decimais', () => expect(add(0.5, 0.25)).toBeCloseTo(0.75));
  test('0.1 + 0.2 com precisão de ponto flutuante', () =>
    expect(add(0.1, 0.2)).toBeCloseTo(0.3));
});

describe('subtract', () => {
  test('10 - 4 = 6', () => expect(subtract(10, 4)).toBe(6));
  test('resultado negativo', () => expect(subtract(4, 10)).toBe(-6));
  test('subtrair negativo', () => expect(subtract(5, -3)).toBe(8));
  test('subtrair zero', () => expect(subtract(9, 0)).toBe(9));
  test('decimais', () => expect(subtract(1.5, 0.5)).toBeCloseTo(1));
});

describe('multiply', () => {
  test('45 * 2 = 90', () => expect(multiply(45, 2)).toBe(90));
  test('multiplicar por zero', () => expect(multiply(123, 0)).toBe(0));
  test('negativo * negativo = positivo', () => expect(multiply(-3, -4)).toBe(12));
  test('negativo * positivo = negativo', () => expect(multiply(-3, 4)).toBe(-12));
  test('multiplicar por 1', () => expect(multiply(8, 1)).toBe(8));
  test('decimais', () => expect(multiply(2.5, 4)).toBeCloseTo(10));
});

describe('divide', () => {
  test('20 / 5 = 4', () => expect(divide(20, 5)).toBe(4));
  test('resultado decimal', () => expect(divide(1, 4)).toBeCloseTo(0.25));
  test('sinais diferentes', () => expect(divide(-10, 2)).toBe(-5));
  test('negativo / negativo', () => expect(divide(-10, -2)).toBe(5));
  test('zero dividido por número', () => expect(divide(0, 5)).toBe(0));
  test('dividir por 1', () => expect(divide(7, 1)).toBe(7));
  test('divisão por zero lança erro', () =>
    expect(() => divide(10, 0)).toThrow('Divisão por zero'));
  test('0 / 0 lança erro', () => expect(() => divide(0, 0)).toThrow());
});

describe('modulo', () => {
  test('5 % 2 = 1', () => expect(modulo(5, 2)).toBe(1));
  test('divisão exata retorna 0', () => expect(modulo(10, 5)).toBe(0));
  test('dividendo menor que divisor', () => expect(modulo(2, 5)).toBe(2));
  test('dividendo negativo mantém o sinal', () => expect(modulo(-5, 2)).toBe(-1));
  test('divisor negativo', () => expect(modulo(5, -2)).toBe(1));
  test('decimais', () => expect(modulo(5.5, 2)).toBeCloseTo(1.5));
  test('módulo por zero lança erro', () =>
    expect(() => modulo(5, 0)).toThrow('Módulo por zero'));
});

describe('power', () => {
  test('2 ^ 3 = 8', () => expect(power(2, 3)).toBe(8));
  test('expoente zero retorna 1', () => expect(power(5, 0)).toBe(1));
  test('expoente 1 retorna a base', () => expect(power(7, 1)).toBe(7));
  test('base zero', () => expect(power(0, 5)).toBe(0));
  test('0 ^ 0 = 1', () => expect(power(0, 0)).toBe(1));
  test('expoente negativo', () => expect(power(2, -2)).toBeCloseTo(0.25));
  test('base negativa com expoente ímpar', () => expect(power(-2, 3)).toBe(-8));
  test('base negativa com expoente par', () => expect(power(-2, 2)).toBe(4));
  test('expoente fracionário', () => expect(power(9, 0.5)).toBeCloseTo(3));
});

describe('squareRoot', () => {
  test('√16 = 4', () => expect(squareRoot(16)).toBe(4));
  test('√0 = 0', () => expect(squareRoot(0)).toBe(0));
  test('√1 = 1', () => expect(squareRoot(1)).toBe(1));
  test('não quadrado perfeito', () => expect(squareRoot(2)).toBeCloseTo(1.41421356));
  test('decimais', () => expect(squareRoot(0.25)).toBeCloseTo(0.5));
  test('número negativo lança erro', () =>
    expect(() => squareRoot(-1)).toThrow('raiz quadrada de um número negativo'));
  test('número muito negativo lança erro', () =>
    expect(() => squareRoot(-1e10)).toThrow());
});

describe('CLI', () => {
  const script = path.join(__dirname, '..', 'calculator.js');
  const run = (...args) => spawnSync('node', [script, ...args], { encoding: 'utf8' });

  test.each([
    [['add', '2', '3'], '5'],
    [['subtract', '10', '4'], '6'],
    [['multiply', '45', '2'], '90'],
    [['divide', '20', '5'], '4'],
  ])('%j imprime %s', (args, expected) => {
    const r = run(...args);
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe(expected);
  });

  test('divisão por zero retorna erro', () => {
    const r = run('divide', '1', '0');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/zero/i);
  });

  test('entrada não numérica retorna erro', () => {
    const r = run('add', 'a', '1');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/números/);
  });

  test('operação desconhecida retorna erro', () => {
    const r = run('pow', '2', '3');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/desconhecida/);
  });

  test('argumentos ausentes mostram uso', () => {
    const r = run('add', '1');
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/Uso/);
  });
});
