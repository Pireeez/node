const express = require("express");
const app = express();
const port = 3000;

const produto = [];
let contador = 1;

app.use(express.json());
app.use(express.static("static"))

app.post('/produtos', (req,res) => {
    const bodyProduto = req.body
    
    if(!bodyProduto.nome || !bodyProduto.preco){
        res.status(400).json({message: "Informe o nome e o preço do produto!"})
    }
    if(bodyProduto){
        produto.push(bodyProduto);
        produto.forEach(key => {
            if(!key.produtoID){
                key.produtoID = contador++
                key.precoFormatado = key.preco.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})
            }
        })
        res.status(201).json({
                informacao: "Produto adicionado!",
                produto: bodyProduto
        })
    }
})

app.listen(port, () => {
    console.log(`API: http://localhost:${port}`)
});