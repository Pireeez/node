
const calculaGorjeta = require('/Users/Gustavo/Desktop/node/Modulo2/gorjeta');
const calculadoraOperacao = require('/Users/Gustavo/Desktop/node/Modulo2/calculadora');
const converteFahrenheit = require('/Users/Gustavo/Desktop/node/Modulo2/temperatura');
const prompts = require('./prompts')

const funcoes = [
    {
        descricao: 'Calcula Gorjeta',
        exec: async () => {
            console.clear();
            const value = await prompts.getNumberGorjeta();
            calculaGorjeta(value.inputVal, value.inputPor);
        }
    },
    {
        descricao: 'Calculadora com Operador',
        exec: async () => {
            console.clear();
            const value = await prompts.getNumberCalculos();
            console.log(calculadoraOperacao(value.num1, value.num2, value.operador));
        }
    },
    {
        descricao: 'Converter temperatura para Fahrenheit',
        exec: async () => {
            console.clear();
            const value = await prompts.getNumberTemp();
            console.log(converteFahrenheit(value.tempC));
        }
    }
];

module.exports = funcoes;