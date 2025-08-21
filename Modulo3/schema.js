const colors = require("@colors/colors");

const schemaInput = {
  properties: {
    inputCal: {
      description: colors.green(
        "Digite o número do código que queres fazer o calculo: "
      ),
      required: true,
      type: "number",
      message: "O primeiro número é obrigatório",
    },
  },
};

const schemaInputGorjeta = {
  properties: {
    inputVal: {
      description: colors.green("Digite o valor da conta: "),
      required: true,
      type: "number",
      message: "Campo obrigatório",
    },
    inputPor: {
      description: colors.green("Digite a porcentagem da gorjeta: "),
      required: true,
      type: "number",
      message: "Campo obrigatório",
    },
  },
};

const schemaInputCalculos = {
  properties: {
    num1: {
      description: colors.green("Digite o primeiro valor: "),
      required: true,
      type: "number",
      message: "Campo obrigatório",
    },
    num2: {
      description: colors.green("Digite o segundo valor: "),
      required: true,
      type: "number",
      message: "Campo obrigatório",
    },
    operador: {
      description: colors.green("Digite o operador: "),
      required: true,
      type: "string",
      message: "Campo obrigatório",
    },
  },
};

const schemaInputTemp = {
  properties: {
    tempC: {
      description: colors.green("Digite a temperatura em Celcius: "),
      required: true,
      type: "number",
      message: "Campo obrigatório",
    },
  },
};

const schemaAtv2 = {
  properties:{
    inputState:{
      description: colors.green("Digite um estado da lista: "),
      type: "string",
      required: true,
      message: "Por favor, preencha o campo de Estado."
    }
  }
}

module.exports = {schemaInput, schemaInputGorjeta, schemaInputCalculos, schemaInputTemp, schemaAtv2};
