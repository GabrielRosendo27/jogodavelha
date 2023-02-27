// Referênciando o h2 do HTML, classe = currentPlayer
const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X";
// Váriavel positions com posições vencedoras possíveis
let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Chamando Função
function init() {
  // Váriavel selected iniciando como 'vazio'
  selected = [];
  // currentPlayer (h2 do HTML), vai armazenar váriavel 'Player' (X como inicial)
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
  // Fazer uma querySelectorAll em todos os botões da DIV .janela-jogo
  // fazer um forEach para cada um dos botões, para que cada botão, quando for inicializado
  document.querySelectorAll(".janela-jogo button").forEach((item) => {
    // começar com o innerHTML como = "",(vazio), com nada preenchido
    item.innerHTML = "";
    // Atribuindo o evento click de cada botão uma função newMove
    item.addEventListener("click", newMove);
  });
}
// iniciar o init quando abrir o arquivo
init();

// criando função newMove, recebendo o evento referente ao botão
function newMove(e) {
  // Selecionando o atributo data-i do HTML, que vai retornar o valor do botão (1,2,3)
  const index = e.target.getAttribute("data-i");
  // Passando para o innerHTML do botão a informação do Player
  e.target.innerHTML = player;
  // Removendo o evento Click da função newMove, para que não seja possível clicar mais de uma vez
  e.target.removeEventListener("click", newMove);
  // Váriavel selected, armazena os itens que já foram selecionados
  selected[index] = player;

  setTimeout(() => {
    // chamando função check
    check();
  }, [100]);
  // Trocando o player: se tiver X selecionado, será a bolinha e vice versa.
  player = player === "X" ? "O" : "X";
  // A cada movimento será trocado o currentPlayer (h2 do HTML), atribuindo o novo player
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

function check() {
  // Pegando o último player que jogou
  let playerLastMove = player === "X" ? "O" : "X";

  // const items que vai mapear os itens selecinados, gerando novo array com item [i = index do item]
  // filtrar o novo array, verificando quais itens selecionados batem com o último player

  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

  // for para percorrer cada posição que é possível ter um ganhador
  // verificando atráves do every, se os itens selecionados do último player, tem o item dessa posição
  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      // se tiver um ganhador, aciona o Alert
      alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
      // inicializando o game
      init();
      return;
    }
  }
  // Verificando se deu empate com filter nos itens selecionados
  // verificando se tem 9 itens selecionados, se sim, da o alert de empate
  if (selected.filter((item) => item).length === 9) {
    alert("DEU EMPATE!");
    init();
    return;
  }
}
