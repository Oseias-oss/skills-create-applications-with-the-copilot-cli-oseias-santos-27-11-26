#!/usr/bin/env node
/**
 * Calculadora CLI
 *
 * Operações suportadas:
 *   - add       (addition)       a + b
 *   - subtract  (subtraction)    a - b
 *   - multiply  (multiplication) a * b
 *   - divide    (division)       a / b (divisão por zero gera erro)
 *
 * Uso: node src/calculator.js <operação> <a> <b>
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

// Modulo (resto da divisão)
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Módulo por zero não é permitido.');
  }
  return a % b;
}

// Power (exponenciação)
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Square root (raiz quadrada)
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Não é possível calcular a raiz quadrada de um número negativo.');
  }
  return Math.sqrt(n);
}

const operations = { add, subtract, multiply, divide };

function main(args) {
  const [op, rawA, rawB] = args;

  if (!op || rawA === undefined || rawB === undefined) {
    console.error('Uso: node calculator.js <add|subtract|multiply|divide> <a> <b>');
    return 1;
  }
  if (!Object.prototype.hasOwnProperty.call(operations, op)) {
    console.error(`Erro: operação desconhecida "${op}". Use add, subtract, multiply ou divide.`);
    return 1;
  }

  const a = Number(rawA);
  const b = Number(rawB);
  if (rawA.trim() === '' || rawB.trim() === '' || Number.isNaN(a) || Number.isNaN(b)) {
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
