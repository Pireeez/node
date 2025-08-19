const { create } = require('domain');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const listProduto = []
const carrinho = [];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);

    if (reqUrl.pathname === '/') {
        res.statusCode = 200;
        res.end(`Olá mundo! - ${res.statusCode}`);
        
    //DATAHORA
    } else if (reqUrl.pathname === '/datahora') {
        res.statusCode = 200;
        const agora = new Date().toLocaleString('pt-BR');
        res.end(`Data e hora atual: ${agora}`);

    //GET
    } else if (req.method === 'GET' && reqUrl.pathname === '/produto') {
        const fruta = reqUrl.searchParams.get('nome');

        if (fruta) {
            listProduto.push(fruta);
            res.statusCode = 200;
            res.end(`Fruta "${fruta}" adicionada!`);
        } else {
            res.statusCode = 400;
            res.end('Informe uma fruta usando ?nome=fruta');
        }

    //POST
    } else if (req.method === 'POST' && reqUrl.pathname === '/carrinho'){
        let body = '';

        // Receber os dados enviados no POST
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // Quando terminar de receber os dados
        req.on('end', () => {
            try {
                const produto = JSON.parse(body); // Converte JSON enviado para objeto
                carrinho.push(produto); // Adiciona ao array
                res.statusCode = 201;
                res.end(`Produto adicionado ao carrinho: ${JSON.stringify(carrinho)}`);
            } catch (err) {
                res.statusCode = 400;
                res.end('Dados inválidos');
            }
        });

    }else if (req.method === 'PUT' && reqUrl.pathname === '/alteraCarrinho'){
        let body = ''

        req.on('data', chunk => {
            body += chunk.toString();
        })

        req.on('end', () => {
            try {
                const newProduto = JSON.parse(body);
                if(nomeProduto){

                }

            } catch (error) {
                
            }
        })
    } else if(req.method === 'DELETE' && reqUrl.pathname === '/delete'){
        const deleteFruta = reqUrl.searchParams.get('nome');

        if(!deleteFruta){
            res.statusCode = 400;
            res.end('Informe a fruta que deseja deletar ?nome=produto');
            return
        }
        const index = listProduto.indexOf(deleteFruta);
        if(index !== -1){
            listProduto.splice(index, 1);
            res.statusCode = 200;
            res.end(`Produto "${deleteFruta}" removido!`);
        } else {
            res.statusCode = 404;
            res.end(`Produto "${deleteFruta}" não encontrado`);
        }

    //View-Produto
    } else if (reqUrl.pathname === '/view-produto') {
        res.statusCode = 200;
        res.end(`Lista de Produtos: ${listProduto}`);

    } else {
        res.statusCode = 404;
        res.end('Não encontrado');
    }
});


server.listen (port, hostname, () =>{
    console.log(`Servidor rodando em http://${hostname}:${port}`);
})


// Atividade 3
// Crie duas rotas, a primeira chamada /produto que adiciona um produto em uma lista,
//  e a segunda chamada /view-produtos que mostra todos os produtos da lista
