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
                const produtoFiltrado = listProduto[0].produto.find(item => item.nome === filter)

                //filtro
                if(produtoFiltrado && filter){
                    res.statusCode = 200;
                    res.end(`Produto filtrado: \nNome: ${produtoFiltrado.nome} - Quantidade: ${produtoFiltrado.quantidade}`);
                }   

                if(!produtoFiltrado && filter){
                    res.statusCode = 200;
                    return res.end(`O ${filter} não existe na lista!`);
                }

                //exibe lista
                if(listProduto && !filter){
                    res.statusCode = 200;
                    const list = listProduto[0].produto.map(item => `Nome: ${item.nome} - Quantidade: ${item.quantidade}`).join('\n')
                    res.end(`Lista de Produtos: \n${list}`);
                }

                if(!listProduto && !filter){
                    res.statusCode = 404;
                    return res.end("A lista está vázia")
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
                        const listAdd = produto.produto.map(item => `${item.nome} - Quantidade: ${item.quantidade}`).join('\n')
                        res.statusCode = 201;
                        listProduto.push(produto);
                        res.end(`O Produto: \n${listAdd} \n\nfoi adicionado a sua lista`);
                    } catch (error) {
                        res.end('Algo deu errado', error);
                    }
                })
            }

            if(req.method === 'PUT'){
                let bodyUpdate = '';

                req.on('data', chunk => {
                    bodyUpdate += chunk.toString();
                    }
                )

                req.on('end', () => {
                    try {
                        const produtoUpdate = JSON.parse(bodyUpdate);
                        const produtoFiltrado = listProduto[0].produto.find(item => item.nome === produtoUpdate.nome) //continua sendo minha referencia para a global
                        
                        if(produtoFiltrado){
                            produtoFiltrado.quantidade = produtoUpdate.quantidade;
                        }
                        res.statusCode = 201;
                        res.end(`O item ${produtoFiltrado.nome} foi alterado para a quantidade: ${produtoFiltrado.quantidade}`)
                    } catch (error) {
                        res.end(`O Produto não existente`)
                    }
                })
            }

            if(req.method === 'DELETE'){
                let bodyDelete = '';

                req.on('data', chunk => {
                    bodyDelete += chunk.toString();
                })

                req.on('end', () =>{
                    const produtoDelete = JSON.parse(bodyDelete);
                    const index = listProduto[0].produto.findIndex(item => item.nome === produtoDelete.nome);  // encontra o índice do produto pelo nome

                    if(index !== -1){
                       listProduto[0].produto.splice(index, 1)//index: o item q quero mexer, 1: numero q quero remover
                       res.end(`O Produto ${produtoDelete} foi excluído`)
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
