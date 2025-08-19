const axios = require("axios"); //usado para fazer requisição HTTP
// const getStates = async () => {
//   try {
//     console.clear();
//     const statesData = await axios.get("https://brasilapi.com.br/api/ibge/uf/v1").then((item) => item.data); //retorna Json, conteudo principal da API;
//     const nameStates = statesData.map(item => item.nome).sort() //retorna um array ordenado;
//     nameStates.forEach((states,i) => {console.log(colors.green.bold(colors.yellow(i+1),states))});

//     prompt.get(
//       {
//         properties:{
//           inputState:{
//             description: colors.green("Digite um estado da lista: "),
//             type: "string",
//             required: true,
//             message: "Por favor, preencha o campo de Estado."
//           }
//         },
//       }, async(err, res) => {
//             const statesObj = statesData.find(item => item.nome === res.inputState);

//             if(statesObj){
//                 const cityData = await axios.get(`https://brasilapi.com.br/api/ibge/municipios/v1/${statesObj.sigla}?providers=dados-abertos-br,gov,wikipedia`).then(item => item.data);
//                 console.clear()
//                 console.log(colors.blue.bold("---------- Lista de Cidades ----------"));
//                 cityData.forEach(city => console.log(colors.rainbow(city.nome)))
//                 console.log(colors.blue.bold("---------- Lista de Cidades ----------"));
//             }
//             if(!statesObj){
//                 console.clear();
//                 console.log(colors.red.bold(`Estado: "${colors.green(res.inputState)}" inválido: Aguarde e selecione um estado da lista.`));
//                 setTimeout(getStates,5000)     
//             }

//             if(err){
//                 return console.log(err);
//             }
//         })
//     }
//     catch (err) {
//         console.log(err);
//     } 
//   };


//   getStates()