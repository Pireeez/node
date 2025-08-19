// 1. Importar o módulo http
const http = require('http');

// 2. Definir o endereço e a porta onde o servidor irá rodar
const hostname = '127.0.0.1'; // Endereço de loopback, ou seja, 'localhost'
const port = 3000;

// 3. Criar o servidor
const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.statusCode = 200; // Código de status HTTP 200 OK
        res.setHeader('Content-Type', 'text/plain'); // Informa ao cliente que a resposta é texto puro
        res.end('Ola, Mundo!\n');
    }else{
        res.statusCode = 404;// Código de status HTTP 404 
        res.end("Não Encontrado")
    }

    // if(req.url === '/data'){
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'text/plain');
    //     const dataHora = new Date;
    //     res.end(dataHora)
    // }
});

// 6. Colocar o servidor para "ouvir" na porta e endereço definidos
server.listen(port, hostname, () => {

  // Esta função é executada uma vez, quando o servidor começa a rodar
  console.log(`Servidor rodando em <http://${hostname}:${port}/`);

});
