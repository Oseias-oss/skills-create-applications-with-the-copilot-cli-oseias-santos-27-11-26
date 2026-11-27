#!/usr/bin/env node
/**
 * Calculadora CLI
 *
 * Operações suportadas:
 *   - add       (addition)       a + b
 *   - subtract  (subtraction)    a - b
 *   - multiply  (multiplication) a * b
 *   - divide    (division)       a / b (divisão por zero gera erro)
 *   - modulo    (remainder)      a % b (divisão por zero gera erro)
 *   - power     (exponentiation) a ** b
 *   - squareRoot (square root)   √a (números negativos geram erro)
 *
 * Uso: node src/calculator.js <operação> <a> [b]
 * Exemplo: node src/calculator.js add 2 3   # 5
 */

// Addition (adição)
function add(a, b) {
  return a + b;
}

// Subtraction (subtração)
function subtract(a, b) {
  return a - b;
}

// Multiplication (multiplicação)
function multiply(a, b) {
  return a * b;
}

// Division (divisão)
function divide(a, b) {
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida.');
  }
  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida.');
  }
  return a % b;
}

function power(base, exponent) {
  if (base === 0 && exponent < 0) {
    throw new Error('Zero não pode ser elevado a um expoente negativo.');
  }
  const result = base ** exponent;
  if (Number.isNaN(result)) {
    throw new Error('Potência inválida para números reais.');
  }
  return result;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Raiz quadrada de número negativo não é permitida.');
  }
  return Math.sqrt(n);
}

const operations = { add, subtract, multiply, divide, modulo, power, squareRoot };

function main(args) {
  const [op, rawA, rawB] = args;

  if (!op || rawA === undefined || (op !== 'squareRoot' && rawB === undefined)) {
    console.error('Uso: node calculator.js <add|subtract|multiply|divide|modulo|power|squareRoot> <a> [b]');
    return 1;
  }
  if (!Object.prototype.hasOwnProperty.call(operations, op)) {
    console.error(`Erro: operação desconhecida "${op}". Use add, subtract, multiply, divide, modulo, power ou squareRoot.`);
    return 1;
  }

  const a = Number(rawA);
  const b = Number(rawB);
  if (rawA.trim() === '' || Number.isNaN(a) ||
      (rawB !== undefined && (rawB.trim() === '' || Number.isNaN(b)))) {
    console.error('Erro: os operandos devem ser números válidos.');
    return 1;
  }

  try {
    console.log(operations[op](a, b));
    return 0;
  } catch (err) {
    console.error(`Erro: ${err.message}`);
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };
