const calculadora = (num1,num2,ope) => {
    switch(ope){
        case '+': return num1 + num2;
        case '*': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : 'divisão inválida';
        case '-': return num1 - num2;
     }
}

export default calculadora;