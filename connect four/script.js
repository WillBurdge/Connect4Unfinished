// Define canvas element and context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Set up game board
const ROWS = 6;
const COLS = 7;
const CELL_SIZE = 50;
const board = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0));

// Set up player turn
let player = 1;

// Draw game board
function drawBoard() {
  // Draw background
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw cells
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      ctx.fillStyle = board[row][col] === 0 ? 'white' : board[row][col] === 1 ? 'red' : 'yellow';
      ctx.beginPath();
      ctx.arc(col * CELL_SIZE + CELL_SIZE / 2, row * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2 - 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}

// Handle player input
function handleInput(event) {
  const col = Math.floor((event.clientX - canvas.offsetLeft) / CELL_SIZE);
  if (board[0][col] !== 0) return;
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      board[row][col] = player;
      drawBoard();
      if (checkWin(row, col)) {
        setTimeout(() => alert(`Player ${player} wins!`), 50);
        canvas.removeEventListener('click', handleInput);
        return;
      }
      player = player === 1 ? 2 : 1;
      break;
    }
  }
}

// Check for a win
function checkWin(row, col) {
  const directions = [
    [1, 0], // horizontal
    [0, 1], // vertical
    [1, 1], // diagonal 1
    [-1, 1], // diagonal 2
  ];

  for (let i = 0; i < directions.length; i++) {
    let count = 1;
    const [dx, dy] = directions[i];
    let r = row + dx;
    let c = col + dy;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      count++;
      r += dx;
      c += dy;
    }
    r = row - dx;
    c = col - dy;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      count++;
      r -= dx;
      c -= dy;
    }
    if (count >= 4) {
      return true;
    }
  }
  return false;
}

// Start the game
drawBoard();
canvas.addEventListener('click', handleInput);
