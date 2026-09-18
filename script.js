const senha = document.getElementById("senha");
const tamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valorTamanho");

const maiusculas = document.getElementById("maiusculas");
const minusculas = document.getElementById("minusculas");
const numeros = document.getElementById("numeros");
const simbolos = document.getElementById("simbolos");

const gerar = document.getElementById("gerar");
const copiar = document.getElementById("copiar");

const nivel = document.getElementById("nivel");
const textoForca = document.getElementById("textoForca");

// Caracteres disponíveis
const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numerosLista = "0123456789";
const simbolosLista = "!@#$%&*()_-+=<>?/{}[]";

// Atualiza o valor do slider
tamanho.addEventListener("input", () => {
    valorTamanho.textContent = tamanho.value;
});

// Gera a senha
function gerarSenha() {

    let caracteres = "";

    if (maiusculas.checked) caracteres += letrasMaiusculas;
    if (minusculas.checked) caracteres += letrasMinusculas;
    if (numeros.checked) caracteres += numerosLista;
    if (simbolos.checked) caracteres += simbolosLista;

    if (caracteres === "") {
        alert("Selecione pelo menos uma opção!");
        return;
    }

    let senhaGerada = "";

    for (let i = 0; i < tamanho.value; i++) {

        const indice = Math.floor(Math.random() * caracteres.length);

        senhaGerada += caracteres[indice];

    }

    senha.value = senhaGerada;

    verificarForca(senhaGerada);

}

// Verifica força da senha
function verificarForca(senhaTexto) {

    let pontos = 0;

    if (senhaTexto.length >= 8) pontos++;
    if (senhaTexto.length >= 12) pontos++;

    if (/[A-Z]/.test(senhaTexto)) pontos++;
    if (/[a-z]/.test(senhaTexto)) pontos++;
    if (/[0-9]/.test(senhaTexto)) pontos++;
    if (/[^A-Za-z0-9]/.test(senhaTexto)) pontos++;

    if (pontos <= 2) {

        nivel.style.width = "30%";
        nivel.style.background = "#ff3b30";
        textoForca.textContent = "🔴 Fraca";

    }

    else if (pontos <= 4) {

        nivel.style.width = "65%";
        nivel.style.background = "#ffb100";
        textoForca.textContent = "🟡 Média";

    }

    else {

        nivel.style.width = "100%";
        nivel.style.background = "#00d26a";
        textoForca.textContent = "🟢 Forte";

    }

}

// Copiar senha
copiar.addEventListener("click", () => {

    if (senha.value === "") return;

    navigator.clipboard.writeText(senha.value);

    copiar.textContent = "Copiado!";

    setTimeout(() => {

        copiar.textContent = "Copiar";

    }, 1500);

});

// Botão gerar
gerar.addEventListener("click", gerarSenha);

// Gera uma senha ao abrir a página
gerarSenha();
