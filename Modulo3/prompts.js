const prompt = require("prompt");
const schema = require('./schema');

prompt.start();

const getNumber = async() => { return new Promise((resolve,reject) => {
        prompt.get(schema.schemaInput,(err,res) => {
            if(err) return reject(err);
            resolve(res)
        });
    })
}

const getNumberGorjeta = async() => {
    return new Promise ((resolve,reject) =>{
        prompt.get(schema.schemaInputGorjeta,(err,res) => {
            if(err) return reject(err);
            resolve(res)
        });
    }
)}

const getNumberCalculos = async() => {
    return new Promise ((resolve,reject) =>{
        prompt.get(schema.schemaInputCalculos,(err,res) => {
            if(err) return reject(err);
            resolve(res)
        });
    }
)}

const getNumberTemp = async() => {
    return new Promise((resolve,reject) => {
        prompt.get(schema.schemaInputTemp,(err,res) => {
            if(err) return reject(err);
            resolve(res)
        });
    })
}

module.exports = {getNumber, getNumberGorjeta, getNumberCalculos, getNumberTemp};