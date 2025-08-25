
// const calculaGorjeta = require('../Modulo2/gorjeta.cjs')
// const calculadoraOperacao = require('../Modulo2/calculadora.cjs');
// const converteFahrenheit = require('../Modulo2/temperatura.cjs');
// const prompts = require('./prompts')

import calculaGorjeta from '../Modulo2/gorjeta.js';
import calculadoraOperacao from '../Modulo2/calculadora.js';
import converteFahrenheit from '../Modulo2/temperatura.js';
import prompts from './prompts.js'


const funcoes = [
    {
        descricao: 'Calcula Gorjeta',
        exec: async () => {
            console.clear();
            const value = await prompts.resGorjeta();
            calculaGorjeta(value.inputVal, value.inputPor);
        }
    },
    {
        descricao: 'Calculadora com Operador',
        exec: async () => {
            console.clear();
            const value = await prompts.resCalculo();
            console.log(calculadoraOperacao(value.num1, value.num2, value.operador));
        }
    },
    {
        descricao: 'Converter temperatura para Fahrenheit',
        exec: async () => {
            console.clear();
            const value = await prompts.resTemp();
            console.log(converteFahrenheit(value.tempC));
        }
    }
];

export default funcoes;