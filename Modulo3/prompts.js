const prompt = require("prompt");
const schema = require('./schema');

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

module.exports = {resNumber, resGorjeta, resCalculo, resTemp}