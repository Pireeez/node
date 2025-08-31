const express = require("express");
const app = express();
const port = 3000;
const produto = [
    { nome: "morango", preco: 12, produtoId: 1 },
    { nome: "kiwi", preco: 12, produtoId: 2 },
];
let contador =
    produto.length > 0
        ? Math.max(...produto.map((key) => key.produtoId || 0)) + 1
        : 1;

app.use(express.json());
app.use(express.static("static"));

app.post("/produtos", (req, res) => {
    try {
        const bodyProduto = req.body;

        if (
            typeof bodyProduto.nome !== "string" ||
            typeof bodyProduto.preco !== "number"
        ) {
            return res.status(400).json({
                message: "Campo inválido",
                status: 400,
            });
        }

        if (bodyProduto) {
            const existeProduto = produto.find(
                (key) => key.nome === bodyProduto.nome
            );
            if (existeProduto) {
                return res.status(409).json({
                    message: `"${bodyProduto.nome}" Já foi adicionado!`,
                });
            } else {
                produto.push(bodyProduto);
                produto.forEach((key) => {
                    if (!key.produtoId) {
                        //preciso pegar o maior id e atribui + 1
                        key.produtoId = contador++;
                    }
                });
                return res.status(201).json({
                    message: "Produto Adicionado com sucesso!",
                    produto: bodyProduto,
                });
            }
        } else {
            res.status(404).json({
                message: "Preenche os campos nome e preço!",
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/produtos", (req, res) => {
    try {
        const filter = req.query.nome;
        const findFilter = produto.find((p) => p.nome === filter);

        if (filter) {
            if (findFilter) {
                return res.status(200).json({
                    produto: findFilter,
                    status: 200,
                });
            } else {
                return res.status(404).json({
                    message: `${filter} Não existe!`,
                    status: 404,
                });
            }
        } else if (produto.length === 0) {
            return res.status(404).json({
                message: "Lista de Produto vázia!",
                status: 404,
            });
        } else {
            return res.status(200).json({
                status: 200,
                produto: produto,
            });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

app.patch("/produtos", (req, res) => {
    try {
        const bodyUpdate = req.body;
        const index = produto.findIndex(
            (key) => key.produtoId === bodyUpdate.produtoId
        );

        const nomeExistente = produto.find(
            (key) => key.nome === bodyUpdate.alterar.nome
        );
        console.log(nomeExistente);

        // if (
        //     typeof bodyUpdate.alterar.nome !== "string" ||
        //     typeof bodyUpdate.alterar.preco !== "number"
        // ) {
        //     res.status(400).json({
        //         message: "Os campos Nome devem ser texto e Preço números",
        //         status: 400,
        //     });
        // }
        if (nomeExistente) {
            return res.status(406).json({
                message: "Nome já existente, não pode ser alterado!",
                status: 406,
            });
        }
        if (index !== -1) {
            for (let key in bodyUpdate.alterar) {
                if (produto[index]) {
                    //se bodtUpdate.alterar[key] tiver valor null ou vazio alterar só o que tiver atribuido valor
                    if (bodyUpdate.alterar.nome || bodyUpdate.alterar.preco) {
                        if (
                            bodyUpdate.alterar[key] !== null &&
                            bodyUpdate.alterar[key] !== "" &&
                            bodyUpdate.alterar[key] !== undefined
                        ) {
                            produto[index][key] = bodyUpdate.alterar[key];
                            res.status(201).json({
                                message: "Alteração realizada com sucesso: ",
                                alteracao: bodyUpdate.alterar[key],
                                status: 201,
                            });
                        }
                    } else {
                        //se nenhum dos campos forem escolhidos informar
                        res.status(400).json({
                            message:
                                "Os campos estão vázios! Digite pelo menos uma alteração",
                            status: 400,
                        });
                    }
                }
            }
        } else {
            res.status(400).json({ message: "Esse Produto não existe!" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

app.delete("/produtos", (req, res) => {
    try {
        const bodyProdutoId = req.body;
        const index = produto.findIndex(
            (item) => item.produtoId === bodyProdutoId.produtoId
        );

        if (index !== -1) {
            produto.splice(index, 1);
            res.status(201).json({
                message: "Produto excluído com sucesso!",
                status: 201,
            });
        } else {
            res.status(404).json({
                message: "Não existe nenhum produto na lista!",
            });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

app.listen(port, () => {
    console.log(`API: http://localhost:${port}`);
});
