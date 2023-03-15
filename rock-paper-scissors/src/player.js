let playerWinCount = 0;
let opponentWinCount = 0;
let tieCount = 0;
function calculateWinRate() {
  const totalGames = playerWinCount + opponentWinCount + tieCount;
  if (totalGames === 0) {
    return "0%";
  }
  return `${((playerWinCount / totalGames) * 100).toFixed(2)}%`;
}

function predictPattern(opponentHistory) {
  const patternLength = 3;
  const n = opponentHistory.length;
  if (n < patternLength) {
    return null;
  }

  const pattern = opponentHistory.slice(-patternLength);
  for (let i = 0; i < n - patternLength; i++) {
    if (opponentHistory.slice(i, i + patternLength).join("") === pattern.join("")) {
      return opponentHistory[i + patternLength];
    }
  }
  return null;
}

function getWinningMove(move) {
  if (move === "R") {
    return "P";
  } else if (move === "P") {
    return "S";
  } else {
    return "R";
  }
}

export function player(prevPlay, opponentHistory = [], winCounts = {}) {
  opponentHistory.push(prevPlay);

  // If the opponent has not played at least two moves, play randomly
  if (opponentHistory.length < 2) {
    return randomMove();
  }

  // If the opponent played the same move twice, play the move that beats their last move
  if (opponentHistory.slice(-1)[0] === opponentHistory.slice(-2)[0]) {
    return getWinningMove(opponentHistory.slice(-1)[0]);
  }

  // If the opponent played different moves twice, play a random move
  if (opponentHistory.slice(-1)[0] !== opponentHistory.slice(-2)[0]) {
    // Predict the next move based on pattern recognition
    const nextMove = predictPattern(opponentHistory);
    if (nextMove) {
      return getWinningMove(nextMove);
    }

    // Choose the move with the highest winning rate
    if (!winCounts.R && !winCounts.P && !winCounts.S) {
      winCounts.R = 0;
      winCounts.P = 0;
      winCounts.S = 0;
    }

    const totalPlays = winCounts.R + winCounts.P + winCounts.S;
    if (totalPlays === 0) {
      return randomMove();
    }

    const winRates = {
      R: winCounts.R / totalPlays,
      P: winCounts.P / totalPlays,
      S: winCounts.S / totalPlays,
    };
    const bestMove = Object.keys(winRates).reduce((a, b) => (winRates[a] > winRates[b] ? a : b));
    return getWinningMove(bestMove);
  }
}

function randomMove() {
  const moves = ["R", "P", "S"];
  return moves[Math.floor(Math.random() * moves.length)];
}

function onResult(result) {
  if (result === "Player") {
    playerWinCount++;
  }
  updateWinRate();
}

function updateWinRate() {
  const winRateElement = document.getElementById("win-rate");
  winRateElement.textContent = `Win rate: ${calculateWinRate()}`;
}
