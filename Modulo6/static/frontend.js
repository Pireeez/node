const display = document.querySelector("#display");
const container = document.querySelector("#exibeProdutos");
const displayChange = document.querySelector("#display-change");

//adiciona produto
const AddProduto = async () => {
    try {
        //pego meus elementos html atribuo a váriaveis
        const inputName = document.querySelector("#input-name");
        const inputPrice = document.querySelector("#input-price");
        const display = document.querySelector("#display-add");

        //crio um obj para o backend atribuindo valores
        const produto = {
            nome: inputName.value.toLowerCase(),
            preco: parseFloat(inputPrice.value),
        };

        //verifico se tem algum campo não preenchido
        if (!produto.nome || !produto.preco) {
            return alert("Preenche os campos nome e preço!");
        }

        //chamo meu server passando method e o body convertido para json e armazeno na variavel data
        const data = await fetch("/produtos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto),
        }).then((item) => item.json());

        //altero o parágrafo com o retorno da resposta
        display.textContent = data.message;
        inputName.value = "";
        inputPrice.value = "";

        //ativo o btn para verificar a lista de produtos
        document.querySelector("#btnList").style = "display: block;";
    } catch (error) {
        console.error(error);
    }
};

//busca por filtro de todos os produtos
const filtraProduto = async () => {
    try {
        const inputNameFilter = document.querySelector("#input-filter").value;

        if (inputNameFilter === "") {
            alert("Campo de filtro está vazio");
        } else {
            const data = await fetch(
                `/produtos?nome=${inputNameFilter.toLowerCase()}`
            ).then((res) => res.json());

            return data;
        }
    } catch (error) {
        console.error(error);
    }
};

const exibeProdutoFiltrado = async () => {
    try {
        const data = await filtraProduto();

        if (data) {
            if (data.status === 404) {
                throw data;
            }
            if (data.status === 200) {
                const listaFormatada = `Nome: ${
                    data.produto.nome
                }\nPreço: ${formataMoeda(data.produto.preco)}`;
                return (display.textContent = listaFormatada);
            }
        }
    } catch (error) {
        display.textContent = error.message;
    }
};

//busca todos os produtos
const buscaAllProdutos = async () => {
    try {
        //busco dados de todos os produtos
        const data = await fetch("/produtos").then((item) => item.json());
        return data;
    } catch (error) {
        console.error(error);
    }
};

//exibe todos os produtos
const exibeAllProdutos = async () => {
    try {
        const data = await buscaAllProdutos();

        if (data.message) {
            display.textContent = data.message;
        } else {
            //lsitaFormatada customiza exibição
            const listaFormatada = data.produto
                .map(
                    (item) =>
                        `Nome: ${item.nome} - Preço: ${formataMoeda(
                            item.preco
                        )}`
                )
                .join("\n");

            display.textContent = listaFormatada;
        }
    } catch (error) {
        console.log(error);
    }
};

const exibeAlteracaoProduto = async (data) => {
    try {
        const result = await exibeProdutoFiltrado();

        if (result) {
            document.querySelector(".input-Update").style = "display: block;";
        } else {
            document.querySelector(".input-Update").style = "display: none;";
        }
    } catch (error) {
        console.error(error);
    }
};

//faz alteração dos campos existentes
const alteraProduto = async () => {
    try {
        //buscaProdutoUpadate me retorna uma promise e retorna o resultado do id feito na pesquisa
        const result = await filtraProduto();
        const idFilter = result.produto.produtoId;

        //pego os valores desse input
        const inputUpName = document.querySelector("#input-name").value;
        const inputUpPrice = parseFloat(
            document.querySelector("#input-price").value
        );

        //monto obj para o backend
        const bodyUpdate = {
            produtoId: idFilter,
            alterar: { nome: inputUpName, preco: inputUpPrice },
        };

        //envio dados informando as alterações que desejo realizar para o server
        const data = await fetch("/produtos", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyUpdate),
        }).then((item) => item.json());

        if (data.status === 201) {
            displayChange.textContent = data.message;
            document.querySelector(".input-Update").style = "display: none;";
            document.querySelector(".btn-list").style = "display: none;";
            document.querySelector(".change-Main").style = "display: none;";
        }
        if (data.status === 400 || data.status === 406) {
            throw data;
        }
    } catch (error) {
        displayChange.textContent = error.message;
    }
};

//busca lista para deletar
const buscaListaDelete = async () => {
    try {
        const lista = await buscaAllProdutos();
        console.log(lista);
        if (lista.status === 404) {
            display.textContent = lista.message;
            container.style = "display: none;";
        } else {
            display.textContent = "";
            exibeListaDelete(lista);
        }
    } catch (error) {
        console.error(error);
    }
};

//cria lista de produtos para excluir
const exibeListaDelete = (lista) => {
    for (let produto of lista.produto) {
        // cria um elemento para exibir o produto
        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.gap = "10px";
        div.style.marginBottom = "8px";

        // texto do produto
        const p = document.createElement("p");
        p.textContent = `Nome: ${produto.nome} Preço: ${formataMoeda(
            produto.preco
        )} `;

        //botao do lado do produto
        const button = document.createElement("button");
        button.textContent = "Excluir";
        button.addEventListener("click", () => {
            excluiProduto(produto.produtoId);

            container.innerHTML = "";
        });

        // monta a estrutura
        div.appendChild(p);
        div.appendChild(button);
        container.appendChild(div);
    }
};

//exclui Produto
const excluiProduto = async (id) => {
    try {
        const bodyProdutoId = {
            produtoId: id,
        };

        const data = await fetch("/produtos", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyProdutoId),
        }).then((item) => item.json());
        display.textContent = data.message;
    } catch (error) {
        console.error(error);
    }
};

//formata a Moeda para BRL
const formataMoeda = (price) => {
    const value = price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return value;
};
