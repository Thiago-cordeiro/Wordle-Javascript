let palavraCorreta = "";
const tentativasMaximas = 6;
let tentativas = 0;

const grid = document.getElementById("grid");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const messageDisplay = document.getElementById("message");

// Palavra aleatória do JSON
function carregarPalavraAleatoria() {
    fetch('palavras.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(data => {
            const palavras = data.palavras;
            palavraCorreta = palavras[Math.floor(Math.random() * palavras.length)];
            //console.log(palavraCorreta);
        })
        .catch(error => console.error('Erro:', error));
}

carregarPalavraAleatoria();

// Cria a grade do jogo
function criarGrade() {
    for (let i = 0; i < tentativasMaximas; i++) {
        const row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < 5; j++) {
            const box = document.createElement("div");
            box.className = "box";
            row.appendChild(box);
        }
        grid.appendChild(row);
    }
}


function verificarTentativa(tentativa) {
    const letras = tentativa.split("");
    const row = grid.children[tentativas];


    const letrasCorretas = new Array(5).fill(false);
    const letrasUsadas = new Array(5).fill(false);

    letras.forEach((letra, index) => {
        const box = row.children[index];
        if (letra === palavraCorreta[index]) {
            box.textContent = letra;
            box.classList.add("green");
            letrasCorretas[index] = true; 
            letrasUsadas[index] = true; 
        }
    });

        letras.forEach((letra, index) => {
        const box = row.children[index];
        if (!letrasCorretas[index]) { 
            const letraCount = palavraCorreta.split("").filter((l, i) => l === letra && !letrasCorretas[i]).length; 

            if (letraCount > 0) {
                box.textContent = letra;
                box.classList.add("yellow");
                letrasUsadas[palavraCorreta.indexOf(letra, letrasUsadas.indexOf(false))] = true; 
            } else {
                box.textContent = letra;
                box.classList.add("gray");
            }
        }
    });

    tentativas++;
    if (tentativa === palavraCorreta) {
        messageDisplay.textContent = "Você ganhou!";
        submitButton.disabled = true;
    } else if (tentativas === tentativasMaximas) {
        messageDisplay.textContent = `Fim de jogo! A palavra era: ${palavraCorreta}`;
        submitButton.disabled = true;
    }
}


function processarTentativa() {
    const tentativa = guessInput.value.toLowerCase();
    if (tentativa.length === 5 && tentativas < tentativasMaximas) {
        verificarTentativa(tentativa);
        guessInput.value = ""; 
    } else {
        alert("Por favor, digite uma palavra de 5 letras.");
    }
}

guessInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        processarTentativa();
    }
});

criarGrade();
