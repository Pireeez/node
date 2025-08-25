 const calculaGorjeta = (valorConta,porcentagemGorjeta) => {
    let valorGorjeta = (valorConta * (porcentagemGorjeta / 100));
    let calculaTotal = (valorConta + valorGorjeta).toLocaleString('pt-BR', {style:"currency", currency:"BRL"});
    let calculaGorjeta = valorGorjeta.toLocaleString('pt-BR', {style:"currency", currency:"BRL"});

    return console.log(`Valor da gorjeta: ${calculaGorjeta}\nValor total a pagar: ${calculaTotal}`);
}

export default calculaGorjeta;