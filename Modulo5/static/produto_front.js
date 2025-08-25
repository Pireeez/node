const form = document.querySelector("#form-add");//pega o elemento form
const exibeResposta = document.querySelector("#exibeResposta");//parágrafo q exibe resposta
const btnLista = document.querySelector("#btn-lista");// btn que lista produtos

//Adicionar produto
form.addEventListener("submit", async (event) => {
    event.preventDefault();//cancela a ação padrão do submit (envia e recarrega a página)

    const formData = new FormData(form);// pega dados do formulário
    const produto = {
        nome: formData.get("nome").toLowerCase(),
        qtd: formData.get("qtd")
    };

    try{
        const data = await axios.post('/produtos',produto).then(res => res.data)//axios.post, (url,obj:produto)
        const nome = data.produto.nome
        const formataNome = nome[0].toUpperCase() + nome.slice(1)
        exibeResposta.textContent = `${data.informacao} - Nome: ${formataNome}, Qtd: ${data.produto.qtd}`;

        form.reset();
    }catch (error) {
        console.error(error);
        exibeResposta.textContent = `${error.response.data.message}`;//informo o erro que aconteceu
    }
});

//Listar produtos
btnLista.addEventListener("click", async () => {
    try {
        const data = await axios.get("/produtos").then(res => res.data);
        const lista = data.map(key => `Id: ${key.produtoId} Nome: ${key.nome} - Quantidade: ${key.qtd}`)
        exibeResposta.textContent = lista.join('\n');
    } catch (error) {
        console.error(error);
        exibeResposta.textContent = error.response.data.message
    }
});
