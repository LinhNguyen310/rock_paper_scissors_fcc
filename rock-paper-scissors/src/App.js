import React, { useState } from 'react';
import './App.css';
import { player } from './player';

function App() {
  const [playerMove, setPlayerMove] = useState('');
  const [opponentMove, setOpponentMove] = useState('');
  const [result, setResult] = useState('');

  const playGame = (move) => {
    const opponentMove = player(move, opponentHistory);
    const result = getResult(move, opponentMove);
    setPlayerMove(move);
    setOpponentMove(opponentMove);
    setResult(result);
    opponentHistory.push(opponentMove);
  };
  
  const getResult = (playerMove, opponentMove) => {
    if (playerMove === opponentMove) {
      return 'Tie';
    } else if (
      (playerMove === 'R' && opponentMove === 'S') ||
      (playerMove === 'P' && opponentMove === 'R') ||
      (playerMove === 'S' && opponentMove === 'P')
    ) {
      return 'You Win';
    } else {
      return 'Opponent Wins';
    }
  };

  const opponentHistory = [];

  return (
    <div className="App">
      <h1>Rock Paper Scissors</h1>
      <div className="game">
        <div className="player">
          <h2>Player</h2>
          <div className="moves">
            <button onClick={() => playGame('R')}>Rock</button>
            <button onClick={() => playGame('P')}>Paper</button>
            <button onClick={() => playGame('S')}>Scissors</button>
          </div>
          <p>Your Move: {playerMove}</p>
        </div>
        <div className="opponent">
          <h2>Opponent</h2>
          <p>Opponent's Move: {opponentMove}</p>
        </div>
      </div>
      <p className="result">{result}</p>
    </div>
  );
}

export default App;
