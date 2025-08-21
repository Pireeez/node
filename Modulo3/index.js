const funcoes = require('./func');
const prompts = require('./prompts')

(async() => {
    console.clear();
    funcoes.forEach((item,i) => console.log(`${i} - ${item.descricao}`));
    const res = await prompts.resNumber()

    if(funcoes[res.inputCal]){
        await funcoes[res.inputCal].exec()
    }else{
        console.log("Opção inválida");
    }
})();


//mudar para ES6


