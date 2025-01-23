const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Initialize the game board
function createBoard() {
  board.innerHTML = '';
  gameState.fill('');
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.dataset.index;

  if (gameState[cellIndex] !== "" || !gameActive) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');
  checkWinner();
}

// Check for a winner or a draw
function checkWinner() {
  let roundWon = false;

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Reset the game
resetButton.addEventListener('click', createBoard);

// Start the game
createBoard();
