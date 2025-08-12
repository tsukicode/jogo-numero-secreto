let listaDeNumerosSorteados = [] //lista vazia para armazenar numeros que ja foram sorteados na rodada
let numeroLimite = 10; //numero maximo do jogo
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

textoInicial();

function exibirTexto(tag, texto) { //função com parâmetros tag e texto
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function textoInicial() { //função para exibir texto inicial do jogo
    exibirTexto('h1', 'Jogo do número Secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10');
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; //length é a propriedade que contém o numero de elementos nume lista

    if (quantidadeDeElementosNaLista == numeroLimite) { //se a quantidade for igual ao numero limite 
        listaDeNumerosSorteados = []; //vai resetar a lista, podendo resortear numeros que já foram sorteados
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //se a lista conter o numero sorteado na rodada
        return gerarNumeroAleatorio(); //vai sortear outro número novamente para que não se repita
    } else {
        console.log(listaDeNumerosSorteados);
        listaDeNumerosSorteados.push(numeroEscolhido); //se não, vai add o numero sorteado à lista
        return numeroEscolhido;
    }
}

function verificarChute() {
    console.log(numeroSecreto);
    let chute = document.querySelector('input').value; //pega o valor dentro do input

    if (chute == numeroSecreto) { //se a pessoa acertar
        exibirTexto('h1', 'Acertou!');
        let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
        exibirTexto('p', `Você descobriu o número ${numeroSecreto} em ${tentativas} ${palavraTentativa}.`)
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute < numeroSecreto) { //se errar e o chute for menor que o numero
            exibirTexto('p', 'O numero secreto é maior que o chute');
    } else { //se for maior
            exibirTexto('p', 'O numero secreto é menor que o chute');
    }
    tentativas++; //conta as tentativas nas rodadas
    limparCampo();
}

function limparCampo() { //limpa o campo input após cada tentativa 
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo() { //função do botão novo jogo (reiniciar o jogo)
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    textoInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}