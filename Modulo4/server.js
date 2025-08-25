const { rejects } = require("assert");
const { create } = require("domain");
const http = require("http");
const { json } = require("stream/consumers");

let contadorID = 1;

const hostname = "127.0.0.1";
const port = 3000;
const listProduto = [];
const carrinho = [];

const server = http.createServer( async(req, res) => {
  res.setHeader("Content-Type", "text/plain");
  const reqUrl = new URL(req.url, `http://${req.headers.host}`); //cria um obj url que pode ser usado para acessar partes da url

  switch (reqUrl.pathname) {
    case "/produto":
      if (req.method === "GET") {
        const filter = reqUrl.searchParams.get("nome");
        const produtoFiltrado = listProduto.find(item => item.nome === filter);

        if(filter){
          if(produtoFiltrado){
            res.statusCode = 200;
            return res.end(`Produto filtrado: \n${JSON.stringify(produtoFiltrado)}`);
          }else{
            res.statusCode = 200;
            return res.end(`O ${filter} não existe na lista!`);
          }
        }
        if (!listProduto) {
          res.statusCode = 404;
          return res.end("A lista está vázia");
        }
        //exibe lista
        res.statusCode = 200;
        return res.end(`Lista de Produtos:\n\n${listProduto.map(item => JSON.stringify(item)).join('\n')}`);
      }

      if (req.method === "POST") {
        try {
          res.statusCode = 201;
          //pego dados do body
          const dataBody = await bodyOnData(req);

          //atribuo ID a cada elemento
          dataBody.produto.forEach(item => {item.produtoID = contadorID++;});

          //adiciono o obj de produto a minha lista
          listProduto.push(...dataBody.produto);
          
          if(dataBody) {
            res.end(`O Produto: \n${listProduto.map(item => JSON.stringify(item)).join('\n')} \n\nfoi adicionado a sua lista`);
          }
        } catch (error) {
          res.statusCode = 400;
          res.end(error.message)
        }  
      }

      if (req.method === "PATCH") {
        try {
          const dataUpdate = await bodyOnData(req);
          const index = listProduto.findIndex(item => item.produtoID === dataUpdate.produtoID);
          if(index !== -1){
            for(let key in dataUpdate.alterar){
              if(listProduto[index]){
                listProduto[index][key] = dataUpdate.alterar[key]
              }
            }
          }
          res.end(`Produto Alterado`)      

          } catch (error) {
            res.end(`O Produto não existente`);
          }
      }

      if (req.method === "DELETE"){
          const dataDelete = await bodyOnData(req);
          const index = listProduto.findIndex(item => item.produtoID === dataDelete.produtoID); 

          if(index !== -1){
            listProduto.splice(index, 1); //index: o item q quero mexer, 1: numero q quero remover
            res.end(`O Produto ${JSON.stringify(listProduto[index])} foi excluído`);
          }
      }
      break;
    case "/carrinho":
      if (req.method === "POST") {
        let bodyCar = "";

        req.on("data", (chunk) => {
          bodyCar += chunk.toString();
        });

        req.on("end", () => {
          const produto = JSON.parse(bodyCar);
          const listaProdutoCarrinho = produto.carrinho
            .map((item) => `${item.quantidade} - ${item.nome}`)
            .join("\n");

          if (!listaProdutoCarrinho) {
            res.statusCode = 404;
            return res.end("Nenhum item foi adicionado a lista!");
          }

          if (produto) {
            carrinho.push(produto);
            res.statusCode = 201;
            return res.end(
              `Foi adicionado ao carrinho:\n${listaProdutoCarrinho}`
            );
          }
        });
      }

      if (req.method === "GET") {
        const filter = reqUrl.searchParams.get("nome");
        const produtoFiltrado = carrinho[0].carrinho.find(
          (item) => item.nome === filter
        );

        //Filtro não encontrado
        if (!produtoFiltrado && filter) {
          res.statusCode = 404;
          res.end(`${filter} Não encontrado no seu carrinho`);
        }

        //filtro encontrado e exibido
        if (produtoFiltrado && filter) {
          res.statusCode = 200;
          res.end(
            `Produto encontrado: ${produtoFiltrado.nome} - ${produtoFiltrado.quantidade}`
          );
        }

        //lista produtos do carrinho
        const listaProdutoCarrinho = carrinho[0].carrinho
          .map((item) => `${item.nome} - ${item.quantidade}`)
          .join("\n");
        if (!produtoFiltrado && !filter) {
          res.statusCode = 200;
          res.end(`Carrinho: \n${listaProdutoCarrinho}`);
        }
      }

      if (req.method === "PATCH") {
        let bodyPatch = "";

        req.on("data", (chunk) => {
          bodyPatch += chunk.toString();
        });

        req.on("end", () => {
          const newProduto = JSON.parse(bodyPatch);
          const index = carrinho[0].carrinho.findIndex((item) => item.nome === newProduto.nome);

          if (index !== -1) {
            carrinho[0].carrinho[index] = newProduto.altera;
            res.end(`Alterado com sucesso!`);
          } else {
            res.end(`Não há nada para ser alterado!`);
          }
        });
      }

      break;

    default:
      res.statusCode = 400;
      res.end("Algo deu errado!");
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}`);
});

const bodyOnData = (req) =>{
  return new Promise ((resolve, reject) => {
    let body = '';

    req.on("data", (chunk) => {
        body += chunk.toString();  // igual antes
      });
    req.on('end', () => {
      try {
        const data = JSON.parse(body)
        resolve(data)
      }catch (error) {
        reject('Erro ao converter para JSON')
      }
    })
  })  
}
