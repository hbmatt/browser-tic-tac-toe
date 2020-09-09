const playerFactory = (name, symbol) => {
  let moves = [];
  return {name, symbol, moves};
};

const GameBoard = (() => {
  let boardArray = ['T','I','C','T','A','C','T','O','E'];

  const displayChoices = (player) => {
    for(let i = 1; i <= 9; i++) {
      let cell = document.getElementById(`cell${i}`);
      let moveBtn = document.createElement('button');
      moveBtn.addEventListener('click', () => {
        boardArray[i - 1] = `${player.symbol}`;
        player.moves.push(i - 1);
        player.moves.sort();
        setBoard();
        Game.checkWin(player);
      });
      cell.innerHTML = '';
  
      (boardArray[i - 1] === '') ? cell.appendChild(moveBtn) : cell.textContent = boardArray[i - 1];
    };
  };

  function setBoard() {
    let i = 1;
    boardArray.forEach((cellContent) => {
      let cell = document.getElementById(`cell${i}`);
      cell.textContent = cellContent;
      i++;
    });
  };

  const resetBoard = () => {
    boardArray = ['','','','','','','','',''];
  };

  return {boardArray, resetBoard, displayChoices};
})();

const Game = (() => {
  const player1 = playerFactory('Player 1', 'X');
  const player2 = playerFactory('Player 2', 'O');
  let turnCounter = 1

  const start = () => {
    GameBoard.resetBoard();
    playerTurn(player1, player2);
  };

  function displayTurn(player) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    let desc = document.createElement('h2');
    desc.textContent = "Choose a space";
    let title = document.createElement('h1');
    title.textContent = `${player.name}'s Turn`
    content.appendChild(title);
    content.appendChild(desc);
  };

  function playerTurn() {
    let player = (turnCounter % 2 !== 0) ? player1 : player2;
    (turnCounter <= 9) ? displayTurn(player) : endGame();
    GameBoard.displayChoices(player);
    turnCounter++;
  };

  const checkWin = (player) => {
    let winningCells = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let win = winningCells.some((set) => {
      return (player.moves.includes(set[0]) && player.moves.includes(set[1]) && player.moves.includes(set[2])) ? true : false;
    });
    console.log(player.moves);
    console.log(win);
    win ? declareWinner(player) : playerTurn();
  };

  function declareWinner(winner) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    let title = document.createElement('h1');
    title.textContent = `${winner.name} won!`;
    let btn = document.createElement('button');
    btn.setAttribute('id','start');
    btn.textContent = 'Play Again?';
    btn.addEventListener('click', () => {
      resetGame();
      Game.start();
    });
    content.appendChild(title);
    content.appendChild(btn);
  };

  function resetGame() {
    turnCounter = 1;
    player1.moves = [];
    player2.moves = [];
  };

  function endGame() {
    const content = document.getElementById('content');
    content.innerHTML = '';
    let title = document.createElement('h1');
    title.textContent = `It's a draw!`;
    let btn = document.createElement('button');
    btn.setAttribute('id','start');
    btn.textContent = 'Play Again?';
    btn.addEventListener('click', () => {
      resetGame();
      Game.start();
    });
    content.appendChild(title);
    content.appendChild(btn);
  };

  return {start, checkWin};
})();

const startBtn = document.getElementById('start');

startBtn.addEventListener('click', () => {
  Game.start();
});