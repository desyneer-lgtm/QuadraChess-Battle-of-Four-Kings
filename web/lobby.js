const serverUrl = window.location.origin;
QC_Socket.init(serverUrl);

const nameInput = document.getElementById('playerName');
const createBtn = document.getElementById('createRoom');
const joinBtn = document.getElementById('joinRoom');
const roomCodeInput = document.getElementById('roomCode');
const lobby = document.getElementById('lobby');
const board = document.getElementById('board');

createBtn.onclick = () => {
  lobby.style.display = 'none';
  board.style.display = 'block';
};

joinBtn.onclick = () => {
  roomCodeInput.style.display = 'block';
};
