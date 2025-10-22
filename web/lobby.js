// ================================
// QuadraChess Single Player Lobby
// ================================

// When the page loads, find the "Start Game" button
document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startGame");

  // If the button exists, add a click action
  if (startButton) {
    startButton.addEventListener("click", () => {
      // Go to the game page
      window.location.href = "game.html";
    });
  }
});
