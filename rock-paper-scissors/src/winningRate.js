export let wins = 0;
export let losses = 0;

export const updateWinCounts = (didWin) => {
  if (didWin) {
    wins += 1;
  } else {
    losses += 1;
  }
};

export const getWinningRate = () => {
  const totalGames = wins + losses;
  if (totalGames === 0) {
    return 0;
  }
  return (wins / totalGames) * 100;
};
