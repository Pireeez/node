// const prompt = require("prompt");
// const schema = require('./schema');

import prompt from 'prompt';
import schema from './schema.js';

prompt.start();

const getPrompt = async(schema) => { return new Promise((resolve,reject) => {
        prompt.get(schema,(err,res) => {
            if(err) return reject(err);
            resolve(res)
        });
    })
}

const resNumber = () => getPrompt(schema.schemaInput);
const resGorjeta = () => getPrompt(schema.schemaInputGorjeta);
const resCalculo = () => getPrompt(schema.schemaInputCalculos);
const resTemp = () => getPrompt(schema.schemaInputTemp);

export default {resNumber, resGorjeta, resCalculo, resTemp}