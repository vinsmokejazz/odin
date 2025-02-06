// Gameboard Module
const Gameboard = (() => {
  const board = Array(9).fill(null); // Represents a 3x3 grid

  const getBoard = () => board;

  const markCell = (index, marker) => {
    if (board[index] === null) {
      board[index] = marker;
      return true; // Successfully marked
    }
    return false; // Cell already occupied
  };

  const resetBoard = () => {
    board.fill(null);
  };

  return { getBoard, markCell, resetBoard };
})();

// Player Factory
const Player = (name, marker) => {
  return { name, marker };
};

// AI Controller Module
const AIController = (() => {
  const makeMove = () => {
    const board = Gameboard.getBoard();
    const emptyCells = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
    if (emptyCells.length > 0) {
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      GameController.playTurn(randomIndex);
      DisplayController.renderBoard();
    }
  };

  return { makeMove };
})();

// Game Controller Module
const GameController = (() => {
  let player1, player2, currentPlayer, isAIOpponent;

  const initializePlayers = (name1, name2, aiOpponent = false) => {
    player1 = Player(name1 || "Player 1", "X");
    player2 = Player(name2 || (aiOpponent ? "AI" : "Player 2"), "O");
    currentPlayer = player1;
    isAIOpponent = aiOpponent;
  };

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
        DisplayController.showResult(result);
        Gameboard.resetBoard();
      } else {
        switchPlayer();
        DisplayController.updateMessage();
        if (isAIOpponent && currentPlayer === player2) {
          setTimeout(() => AIController.makeMove(), 500); // AI makes a move after a short delay
        }
      }
    }
  };

  return {
    initializePlayers,
    playTurn,
    getCurrentPlayer: () => currentPlayer,
    resetGame: () => {
      Gameboard.resetBoard();
      currentPlayer = player1;
      DisplayController.updateMessage();
    },
  };
})();

// Display Controller Module
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
        if (!GameController.getCurrentPlayer().name.includes("AI")) {
          GameController.playTurn(index);
          renderBoard();
        }
      });
      boardElement.appendChild(cellElement);
    });
  };

  const updateMessage = () => {
    const currentPlayer = GameController.getCurrentPlayer();
    messageElement.textContent = `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
  };

  const showResult = (result) => {
    if (result === "tie") {
      messageElement.textContent = "It's a tie!";
    } else {
      messageElement.textContent = `${result.name} wins!`;
    }
  };

  const init = () => {
    renderBoard();
    updateMessage();
  };

  return { init, renderBoard, updateMessage, showResult };
})();

// Event Listeners
document.getElementById("start-button").addEventListener("click", () => {
  const player1Name = document.getElementById("player1").value;
  const player2Name = document.getElementById("player2").value;
  const aiOpponent = confirm("Play against AI?");
  GameController.initializePlayers(player1Name, aiOpponent ? "" : player2Name, aiOpponent);
  DisplayController.init();
  document.getElementById("restart-button").style.display = "block";
});

document.getElementById("restart-button").addEventListener("click", () => {
  GameController.resetGame();
  DisplayController.renderBoard();
});
//need understand just logic
