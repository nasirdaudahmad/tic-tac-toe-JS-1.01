const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetBtn = document.getElementById('reset-btn');
const twoPlayerBtn = document.getElementById('two-player-mode');
const computerModeBtn = document.getElementById('computer-mode');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let vsComputer = false;  // Added to track if the game is vs Computer

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] !== '' || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    gameStatus.textContent = `${currentPlayer} has won!`;
    isGameActive = false;
  } else if (board.every(cell => cell !== '')) {
    gameStatus.textContent = 'It\'s a draw!';
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `It's ${currentPlayer}'s turn`;

    if (vsComputer && currentPlayer === 'O') {
      setTimeout(computerMove, 500);  // Delay for realism
    }

  }
}

// Random Move for Computer
function computerMove() {
  let availableCells = board
    .map((cell, index) => (cell === '' ? index : null))
    .filter(index => index !== null);

  if (availableCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const cellIndex = availableCells[randomIndex];

    board[cellIndex] = 'O';
    cells[cellIndex].textContent = 'O';

    if (checkWin()) {
      gameStatus.textContent = `Computer has won!`;
      isGameActive = false;
    } else if (board.every(cell => cell !== '')) {
      gameStatus.textContent = 'It\'s a draw!';
      isGameActive = false;
    } else {
      currentPlayer = 'X';
      gameStatus.textContent = `It's ${currentPlayer}'s turn`;
    }
  }
}

// Check if there's a win
function checkWin() {
  return winningConditions.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  isGameActive = true;
  gameStatus.textContent = `It's ${currentPlayer}'s turn`;
}
// Switch to Two Player Mode
function startTwoPlayerGame() {
  vsComputer = false;
  resetGame();
}

// Switch to Player vs. Computer Mode
function startComputerGame() {
  vsComputer = true;
  resetGame();
}
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
twoPlayerBtn.addEventListener('click', startTwoPlayerGame);
computerModeBtn.addEventListener('click', startComputerGame);