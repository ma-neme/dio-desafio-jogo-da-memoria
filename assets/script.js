const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard; //cria 1a e 2a cartas clicadas
let lockBoard = false;

//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return; //não vai acontecer nada caso dermos 2 cliques na mesma carta

    this.classList.add('flip'); //add ao inves de toggle pra que a pessoa não possa trocar de carta
    if(!hasFlippedCard) { //se hasFlippedCard tiver false, seta como true
        hasFlippedCard = true;
        firstCard = this; //elemento que foi clicado
        return;
    }

    secondCard = this;
    hasFlippedCard = false; // reseta a variável pra poder comparar a firstCard com a secondCard
    checkforMatch();
}

// função pra ver se a 1a e 2a carta são iguais
function checkforMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    } 

    unflipCards();
}

// retira o listener de cada carta que a gente clicou, desabilitando-as
function disableCards() {
    firstCard.removeEventListener('click', flipCard); //remove o clique
    secondCard.removeEventListener('click', flipCard);

    resetBoard(); //deixa as 2 variaveis nulas, pra poder recomeçar a jogada
}

// caso as cartas não sejam iguais, elas precisam desvirar
function unflipCards() {
    lockBoard = true; //qd a carta for removida e for virar de volta, coloca o lockBoard como true antes do timeout, pra que não seja possível desvirar

    setTimeout(() => {// método que recebe uma função e um tempo, leva esse tempo pra realizar essa função
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard(); //deixa as 2 variaveis nulas, pra poder recomeçar a jogada
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]; //desestruturar array, criando outro com cada um dos índices
    [firstCard, secondCard] = [null, null];
}

//immediately invoked function: vai ser chamada ao ser invocada

//embaralha as cartas, colocando a order das divs de forma aleatória
(function shuffle() { 
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12); //o floor arredonda reultado da expressão dentro dela. O random vai sortear numeros de 0 a 1 e multiplicar por 12
        card.style.order = randomPosition; //todas as cartas vão ter posição aleatória ao iniciar a página
    })
})();


//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});