const funcoes = require('./func');
const prompts = require('./prompts')

const exibeCalculos = (async() => {
    console.clear();
    funcoes.forEach((item,i) => console.log(`${i} - ${item.descricao}`));
    const res = await prompts.resNumber()

    if(funcoes[res.inputCal]){
        await funcoes[res.inputCal].exec()
    }else{
        console.log("Opção inválida");
    }
})();

