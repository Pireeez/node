const form = document.getElementById("form-add");
const res = document.getElementById("res");
const btnLista = document.getElementById("btn-lista");

//Adicionar produto
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const produto = {
        nome: formData.get("nome"),
        qtd: formData.get("qtd")
    };

    try {
        const data = await axios.post('/produtos',produto).then(res => res.data)
        console.log(data);
        res.textContent = `${data.informacao} - Nome: ${data.produto.nome}, Qtd: ${data.produto.qtd}`;
    
    } catch (error) {
        console.error(error);
        res.textContent = "Erro ao adicionar produto!";
    }
});

//Listar produtos
btnLista.addEventListener("click", async () => {
    try {
        const data = await axios.get("/produtos").then(res => res.data);
        console.log(data);
        if(data.status === 404){
            res.innerText = "Lista de produtos vazia";
            return;
        }

        const lista = data.map(p => `Nome: ${p.nome} - Quantidade: ${p.qtd}`).join("\n");
        res.textContent = lista;
    } catch (error) {
        console.error(error);
        res.textContent = "Erro ao buscar produtos!";
    }
});
