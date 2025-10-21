const serverUrl = window.location.origin;
QC_Socket.init(serverUrl);

const nameInput = document.getElementById('playerName');
const createBtn = document.getElementById('createRoom');
const joinBtn = document.getElementById('joinRoom');
const roomCodeInput = document.getElementById('roomCode');
const lobby = document.getElementById('lobby');
const board = document.getElementById('board');

// ✅ CREATE ROOM
createBtn.onclick = () => {
  const playerName = nameInput.value.trim() || "Player";
  const roomCode = Math.random().toString(36).substring(2, 7).toUpperCase(); // random 5 letters

  // Store name + room for later
  localStorage.setItem("playerName", playerName);
  localStorage.setItem("roomCode", roomCode);

  // Go to the game board page
  window.location.href = `/game.html?room=${roomCode}`;
};

// ✅ JOIN ROOM
joinBtn.onclick = () => {
  const playerName = nameInput.value.trim() || "Player";
  const roomCode = roomCodeInput.value.trim().toUpperCase();

  if (!roomCode) {
    alert("Please enter a room code first!");
    return;
  }

  // Store name + room for later
  localStorage.setItem("playerName", playerName);
  localStorage.setItem("roomCode", roomCode);

  // Go to the game board page
  window.location.href = `/game.html?room=${roomCode}`;
};
