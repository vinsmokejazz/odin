const Gameboard = (() => {
  const board = Array(9).fill(null);

  const getBoard = () => board;

  const markCell = (index, marker) => {
    if (board[index] === null) {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board.fill(null);
  };
  return { getBoard, markCell, resetBoard }
})();

const Player = (name, marker) => {
  return { name, marker };
};

const GameController = (() => {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  let currentPlayer = player1;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWin = () => {
    const board = Gameboard.getBoard();
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return currentPlayer; // Return the winning player
      }
    }

    if (board.every(cell => cell !== null)) {
      return "tie"; // All cells are filled, and no winner
    }

    return null; // No winner yet
  };

  const playTurn = (index) => {
    if (Gameboard.markCell(index, currentPlayer.marker)) {
      const result = checkWin();
      if (result) {
        console.log(result === "tie" ? "It's a tie!" : `${result.name} wins!`);
        Gameboard.resetBoard();
      } else {
        switchPlayer();
      }
    } else {
      console.log("Cell already occupied!");
    }
  };

  return { playTurn, getCurrentPlayer: () => currentPlayer };
})();

const DisplayController = (() => {
  const boardElement = document.querySelector(".gameboard");
  const messageElement = document.querySelector(".message");

  const renderBoard = () => {
    const board = Gameboard.getBoard();
    boardElement.innerHTML = "";
    board.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.textContent = cell || "";
      cellElement.addEventListener("click", () => {
        GameController.playTurn(index);
        renderBoard();
      });
      boardElement.appendChild(cellElement);
    });
  };

  const updateMessage = () => {
    const currentPlayer = GameController.getCurrentPlayer();
    messageElement.textContent = `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
  };

  const init = () => {
    renderBoard();
    updateMessage();
  };

  return { init };
})();

// Initialize the game
DisplayController.init();