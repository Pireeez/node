
const express = require('express'); //Chamo express
const app = express();//instancia express
const port = 3000;
app.use(express.json())// middleware que transforma o body em JSON

let contador = 1;
const produto = [];

app.get('/produto', (req,res) => {
    const filter = req.query.nome
    const produtoEncontrado = produto.find(key => key.nome === filter)

    if(filter){
        if(produtoEncontrado){
            res.status(200).send(`Filtro encontrado: \nNome: ${produtoEncontrado.nome}\nQuantidade: ${produtoEncontrado.quantidade}`);
        }else{
            res.status(404).send(`${filter} não existe!`)
        }
    }
    const listaProdutos = produto.map(key => `${key.produtoID} - ${key.nome}: ${key.quantidade}`).join('\n')
    res.status(200).send(`Lista de Produtos: \n${listaProdutos}`)
})

app.post('/produto', (req,res) => {
    
    const dataGetProduto = req.body;
    produto.push(...dataGetProduto.produto);
    produto.forEach(key => {
        if(!key.produtoID){
            key.produtoID = contador++
        }
    })
    const listaProdutoAdd = produto.map(key => `\nID: ${key.produtoID} - ${key.nome} - ${key.quantidade}`).join('\n')
    res.status(201).send(`Produto adicionado: ${listaProdutoAdd}`);
})

app.patch('/produto', (req,res) => {
    const bodyUpdate = req.body
    const index = produto.findIndex(key => key.produtoID === bodyUpdate.produtoID);
    
    if(index !== -1){
        for(let key in bodyUpdate.alterar){
            if(produto[index]){
                res.status(201).send(`Alteração: ${JSON.stringify(bodyUpdate.alterar)} Realizada!`)
                produto[index][key] = bodyUpdate.alterar[key]
            }
            
        }
    }
})

app.delete('/produto', (req,res) => {
    const bodyDelete = req.body
    const produtoEncontrado = produto.findIndex(key => key.produtoID === bodyDelete.produtoID)

    if(produtoEncontrado !== -1){
        produto.splice(produtoEncontrado,1)
        res.status(201).send("Produto excluído")
    }else{
        res.status(404).send("Esse produto não existe!")
    }
})

app.listen(port, ()=>{ //inicia o server
    console.log(`Servidor Express rodando em <http://localhost:${port}`);
    }
)


