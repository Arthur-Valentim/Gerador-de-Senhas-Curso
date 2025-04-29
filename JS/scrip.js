// Elementos
const generatePasswordButton = document.querySelector("#generate-password");  // Corrigido o nome da variável
const generatedPasswordElement = document.querySelector("#generated-password"); // Corrigido o seletor

// Novas funcionalidades

const openCloseGeneratorOptions = document.querySelector("#open-generate-password")
const generatPasswordConainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#length")
const lettersInput = document.querySelector("#letters")
const numbersInput = document.querySelector("#numbers")
const symbolsInput = document.querySelector("#symbols")
const copyPasswordButton = document.querySelector("#copy-password")

// Funções
// Gera letras aleatórias de acordo com o valor representativo delas
const getLetterLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
    const symbols = "(){}[]=<>/,.!@#$%&*+-";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

// Função para gerar a senha
const generatePassword = () => {
    let password = "";
    const passwordLength = lengthInput.value;  // Tamanho da senha
    const geradores = [];

    if(lettersInput.checked){
        geradores.push(getLetterLower,getLetterUpper)
    }

    if(numbersInput.checked){
        geradores.push(getNumber)
    }

    if(symbolsInput.checked){
        geradores.push(getSymbol)
    }

    if(geradores.length === 0){
        return
    }

    for (let i = 0; i < passwordLength; i++) {  // Corrigido para loop simples
        const randomValue = geradores[Math.floor(Math.random() * geradores.length)]();  // Escolhe uma função aleatória
        password += randomValue;
    }

    console.log(password);  // Exibe a senha no console

    password = password.slice(0,passwordLength);

    // Exibe a senha gerada na tela
    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;
};

// Evento de clique
generatePasswordButton.addEventListener("click", () => {
    generatePassword(getLetterLower, getLetterUpper, getNumber, getSymbol);
});

openCloseGeneratorOptions.addEventListener("click", () =>{
    generatPasswordConainer.classList.toggle("hide")
})

copyPasswordButton.addEventListener("click", (e) =>{
    e.preventDefault()

    const password = generatedPasswordElement.querySelector("h4").innerText

    navigator.clipboard.writeText(password).then(() =>{
        copyPasswordButton.innerText = "Senha copiada"
    })

    setTimeout(() =>{
        copyPasswordButton.innerText = "copiar"
    }, 1000)
})
