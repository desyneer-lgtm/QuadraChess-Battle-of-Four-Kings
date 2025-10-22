const board = document.getElementById("board");

for (let row = 0; row < 14; row++) {
  for (let col = 0; col < 14; col++) {
    const square = document.createElement("div");
    square.classList.add("square");

    // Define cross shape: center 8x8 + arms
    const inCenter = row >= 3 && row <= 10 && col >= 3 && col <= 10;
    const inNorth = row < 3 && col >= 3 && col <= 10;
    const inSouth = row > 10 && col >= 3 && col <= 10;
    const inWest = col < 3 && row >= 3 && row <= 10;
    const inEast = col > 10 && row >= 3 && row <= 10;

    if (inCenter || inNorth || inSouth || inWest || inEast) {
      const isWhite = (row + col) % 2 === 0;
      square.classList.add(isWhite ? "white" : "black");
    } else {
      square.classList.add("empty");
    }

    board.appendChild(square);
  }
}
