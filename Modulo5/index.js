const express = require('express');

const app = express();
const port = 3000;

const bodyParser = require('body-parser');//bodyParser: middleware pega body da requisicao em um obj

app.use(express.json())
app.use(express.static("static")); //permite que o navegador acesse arquivos html,css e js
app.use(bodyParser.urlencoded({ extended: true }));// para pegar dados de form - urlencoded: lidar com formato de forumulario padrao do HTML - extended: permite enviar obj e array, false permite strings e numeros simples

const produto = [];

app.post('/produtos', (req,res) => {
    const bodyProduto = req.body
    if(!bodyProduto.nome || !bodyProduto.qtd){
        res.status(404).json({menssagem: 'Informe o nome e quantidade do produto!'})
    }
    if(bodyProduto){
        produto.push(bodyProduto)
        res.status(201).json({
            informacao: "Produto Adicionado:",
            produto: bodyProduto
        })
    }
})

app.get('/produtos', (req,res) => {
    const listaProdutos = produto.map(item => `${item.nome} - ${item.qtd}`).join('<br>')
    if(listaProdutos){
        res.status(200).json(produto)
    }else{
        res.status(404).json({ mensagem: "Lista de produtos vazia" });
    }
})

app.listen(port, () => {
    console.log(`API está na porta ${port}`)
});





