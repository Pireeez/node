const { create } = require('domain');
const http = require('http');
const { json } = require('stream/consumers');

const hostname = '127.0.0.1';
const port = 3000;
const listProduto = [];
const carrinho = [];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const reqUrl = new URL(req.url, `http://${req.headers.host}`); //cria um obj url que pode ser usado para acessar partes da url

    switch (reqUrl.pathname){
        case '/produto':

            if(req.method === 'GET'){
                const filter = reqUrl.searchParams.get("nome");
                const produtoFiltrado = listProduto.find(item => item.produto.nome === filter)

                //filtro
                if(produtoFiltrado && filter){
                    res.statusCode = 200;
                    return res.end(`Produto filtrado: ${produtoFiltrado.produto.nome} Quantidade: p`);
                }   

            if(!listProduto.nome.includes(filter) && filter){
                res.statusCode = 200;
                return res.end(`O ${filter} não existe na lista!`);
            }

            //lista vazia
            if(listProduto === undefined){
                return res.end("A Lista está vazia!")
            }

            //exibe lista
            if(!listProduto.includes(filter) && !filter && listProduto){
                res.statusCode = 200;
                return res.end(`Lista de Produtos: ${JSON.stringify(listProduto)}`);
            }
            }

            if(req.method === 'POST'){
                let bodyAdd = '';

                req.on('data', chunk => {
                bodyAdd += chunk.toString();
                });

                req.on('end', () => {
                    try {
                        const produto = JSON.parse(bodyAdd);
                        res.statusCode = 201;
                        listProduto.push(produto);
                        res.end(`O Produto: ${JSON.stringify(produto.produto)}, foi adicionado a sua lista`);
                    } catch (error) {
                        res.end('Algo deu errado', error);
                    }
                })
            }

            if(req.method === 'PATCH'){
                let bodyUpdate = '';

                req.on('data', chunk => {
                bodyUpdate += chunk.toString();
                    }
                )

                req.on('end', () => {
                    try {
                    const produtoUpdate = JSON.parse(bodyUpdate);
                    if(listProduto.includes(produtoUpdate.nome)){
                        listProduto.push
                    }
                    res.statusCode = 201;
                    res.end(`O item foi alterado para ${produtoUpdate}`)
                    } catch (error) {
                        res.end("deu erro")
                    }
                })
            }
            
            break;
        case '/carrinho':
            
            break;

        default:
            res.statusCode = 400;
            res.end('Algo deu errado!')
            break;
    }
})

server.listen (port, hostname, () =>{
    console.log(`Servidor rodando em http://${hostname}:${port}`);
    })


//mudar essas minhas condições de if e else, utilizar dois carros principais
// produto e carrinho

// if (reqUrl.pathname === '/') {
//         res.statusCode = 200;
//         res.end(`Olá mundo! - ${res.statusCode}`);
        
//     //DATAHORA
//     } else if (reqUrl.pathname === '/datahora') {
//         res.statusCode = 200;
//         const agora = new Date().toLocaleString('pt-BR');
//         res.end(`Data e hora atual: ${agora}`);

//     //GET
//     } else if (req.method === 'GET' && reqUrl.pathname === '/produto') {
//         const fruta = reqUrl.searchParams.get('nome'); //retorna o valor do nome do produto

//         if(fruta) {
//             listProduto.push(fruta);
//             res.statusCode = 200;
//             res.end(`Fruta "${fruta}" adicionada!`);
//         } else {
//             res.statusCode = 400;
//             res.end('Informe uma fruta usando ?nome=fruta');
//         }

//     //POST
//     } else if (req.method === 'POST' && reqUrl.pathname === '/carrinho'){
//         let body = '';
        
//         //ele recebe pedaços do body  da requisicao
//         req.on('data', chunk => {
//             body += chunk.toString();// converte para string e depois acumula
//         });

//         req.on('end', () => {
//             try {
//                 const produto = JSON.parse(body); // Converte JSON enviado para objeto
//                 carrinho.push(produto); // Adiciona ao array
//                 res.statusCode = 201;
//                 res.end(`Produto adicionado ao carrinho: ${JSON.stringify(carrinho)}`);
//             } catch (err) {
//                 res.statusCode = 400;
//                 res.end('Dados inválidos');
//             }
//         });

//     }else if (req.method === 'PUT' && reqUrl.pathname === '/alteraCarrinho'){
//         let body = ''

//         req.on('data', chunk => {
//             body += chunk.toString();
//         })

//         req.on('end', () => {
//             try {
//                 const newProduto = JSON.parse(body);
//                 if(nomeProduto){

//                 }
//             } catch (error) {
                
//             }
//         })
//     } else if(req.method === 'DELETE' && reqUrl.pathname === '/delete'){
//         const deleteFruta = reqUrl.searchParams.get('nome');

//         if(!deleteFruta){
//             res.statusCode = 400;
//             res.end('Informe a fruta que deseja deletar ?nome=produto');
//             return
//         }
//         const index = listProduto.indexOf(deleteFruta);
//         if(index !== -1){
//             listProduto.splice(index, 1);
//             res.statusCode = 200;
//             res.end(`Produto "${deleteFruta}" removido!`);
//         } else {
//             res.statusCode = 404;
//             res.end(`Produto "${deleteFruta}" não encontrado`);
//         }

//     //View-Produto
//     } else if (reqUrl.pathname === '/view-produto') {
//         res.statusCode = 200;
//         res.end(`Lista de Produtos: ${listProduto}`);

//     } else {
//         res.statusCode = 404;
//         res.end('Não encontrado');
//     }
// });
