
const calculaGorjeta = (valorConta,porcentagemGorjeta) => {
    let calculaGorjeta = (valorConta * (porcentagemGorjeta / 100)).toLocaleString('pt-BR', {style:"currency", currency:"BRL"});
    let calculaTotal = (valorConta + porcentagemGorjeta).toLocaleString('pt-BR', {style:"currency", currency:"BRL"});

    return console.log(`Valor da gorjeta: ${calculaGorjeta}\nValor total a pagar: ${calculaTotal}`);

}

module.exports = calculaGorjeta;