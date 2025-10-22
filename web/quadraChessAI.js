// ==========================
// QuadraChess Solo AI Mode
// ==========================

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const statusEl = document.getElementById("status");

const TILE = 80;
const SIZE = 8; // simplified 8x8 classic chess grid in cross layout later

// --- Piece values (simple heuristic)
const VALUES = { K: 1000, Q: 9, R: 5, B: 3, N: 3, P: 1 };

// --- Define players
const PLAYERS = ["N", "E", "S", "W"];
let currentPlayer = "S"; // You

// --- Board (simple starting setup)
let board = [
  ["r","n","b","q","k","b","n","r"],
  ["p","p","p","p","p","p","p","p"],
  [".",".",".",".",".",".",".","."],
  [".",".",".",".",".",".",".","."],
  [".",".",".",".",".",".",".","."],
  [".",".",".",".",".",".",".","."],
  ["P","P","P","P","P","P","P","P"],
  ["R","N","B","Q","K","B","N","R"]
];

// --- Draw board
function drawBoard() {
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      ctx.fillStyle = (x + y) % 2 ? "#c9a77d" : "#f0d9b5";
      ctx.fillRect(x * TILE, y * TILE, TILE, TILE);

      const piece = board[y][x];
      if (piece !== ".") {
        ctx.fillStyle = piece === piece.toUpperCase() ? "#222" : "#fff";
        ctx.font = "40px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(piece, x * TILE + TILE / 2, y * TILE + TILE / 2);
      }
    }
  }
}

// --- Basic move generation (just pawns & random for now)
function getMoves(player) {
  const moves = [];
  const isWhite = player === "S";

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const piece = board[y][x];
      if (piece === ".") continue;

      const mine = isWhite ? piece === piece.toUpperCase() : piece === piece.toLowerCase();
      if (!mine) continue;

      // Pawns
      if (piece.toLowerCase() === "p") {
        const dir = isWhite ? -1 : 1;
        const ny = y + dir;
        if (ny >= 0 && ny < SIZE && board[ny][x] === ".") {
          moves.push({ from: [x, y], to: [x, ny] });
        }
      }

      // Random: add a simple side move for now
      const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
      for (let [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy;
        if (nx>=0 && nx<SIZE && ny>=0 && ny<SIZE) {
          moves.push({ from: [x, y], to: [nx, ny] });
        }
      }
    }
  }
  return moves;
}

// --- Simple heuristic scoring
function evaluateBoard() {
  let score = 0;
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const piece = board[y][x];
      if (piece === ".") continue;
      const value = VALUES[piece.toUpperCase()] || 0;
      score += piece === piece.toUpperCase() ? value : -value;
    }
  }
  return score;
}

// --- Make a move
function movePiece(move) {
  const [fx, fy] = move.from;
  const [tx, ty] = move.to;
  board[ty][tx] = board[fy][fx];
  board[fy][fx] = ".";
}

// --- AI Move (simple heuristic)
function aiMove(player) {
  const moves = getMoves(player);
  let bestScore = -9999;
  let bestMove = null;

  for (let move of moves) {
    const backup = JSON.parse(JSON.stringify(board));
    movePiece(move);
    const score = evaluateBoard() + Math.random(); // add randomness
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
    board = backup;
  }

  if (bestMove) movePiece(bestMove);
}

// --- Player click handling
canvas.addEventListener("click", e => {
  if (currentPlayer !== "S") return;

  const x = Math.floor(e.offsetX / TILE);
  const y = Math.floor(e.offsetY / TILE);
  console.log("Clicked:", x, y);
  // Add piece moving logic later
});

// --- Game loop
function nextTurn() {
  if (currentPlayer === "S") {
    currentPlayer = "E";
    aiMove("E");
  } else if (currentPlayer === "E") {
    currentPlayer = "N";
    aiMove("N");
  } else if (currentPlayer === "N") {
    currentPlayer = "W";
    aiMove("W");
  } else if (currentPlayer === "W") {
    currentPlayer = "S";
  }
  drawBoard();
  statusEl.textContent = `Turn: ${currentPlayer}`;
  setTimeout(nextTurn, 1500);
}

// --- Start game
drawBoard();
statusEl.textContent = "Turn: S (You)";
setTimeout(nextTurn, 1500);
