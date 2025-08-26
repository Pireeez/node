const btnSubmit = document.querySelector('#btn-submit');
const inputName = document.querySelector('#input-name');
const inputPrice = document.querySelector('#input-price');
const display = document.querySelector('#display')

btnSubmit.addEventListener('click', async() => {
    try{
        const produto = {
            nome: inputName.value,
            preco: parseFloat(inputPrice.value)
        }
        if(!produto.nome || !produto.preco){
            return alert("Preenche os campos nome e preço!")
        }
        const data = await fetch('/produtos',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(produto)
        }).then(item => item.json())

        console.log(data);
        display.textContent = "Produto Adicionado!"
        inputName.value = '';
        inputPrice.value = '';

    }catch (error) {
        console.error(error)
    }
} )