import './ScoreDisplay.css';

const ScoreDisplay = ({ players, currentTurn, gameOver, winner, isMultiplayer = false, myPlayerType = 'HUMAN' }) => {
  // Get player objects based on mode
  let player1, player2, player1Label, player2Label;
  
  if (isMultiplayer) {
    player1 = players?.PLAYER1;
    player2 = players?.PLAYER2;
    player1Label = player1?.username || 'Player 1';
    player2Label = player2?.username || 'Player 2';
    
    console.log('[ScoreDisplay] P1 color:', player1?.color, 'P2 color:', player2?.color);
  } else {
    player1 = players?.HUMAN;
    player2 = players?.COMPUTER;
    player1Label = 'You';
    player2Label = 'Computer';
  }

  const isPlayer1Turn = isMultiplayer ? currentTurn === 'PLAYER1' : currentTurn === 'HUMAN';
  const isPlayer2Turn = isMultiplayer ? currentTurn === 'PLAYER2' : currentTurn === 'COMPUTER';

  return (
    <div className="score-display">
      <div className="score-panel player-score">
        <div className="score-label">
          {player1Label}
          {isMultiplayer && myPlayerType === 'PLAYER1' && <span className="you-badge"> (You)</span>}
        </div>
        <div className="score-value" style={{ color: player1?.color }}>
          {player1?.score.toFixed(2) || '0.00'}
        </div>
        {isPlayer1Turn && !gameOver && (
          <div className="turn-indicator">
            {isMultiplayer && myPlayerType === 'PLAYER1' ? 'Your Turn' : `${player1Label}'s Turn`}
          </div>
        )}
      </div>

      <div className="vs-divider">VS</div>

      <div className="score-panel computer-score">
        <div className="score-label">
          {player2Label}
          {isMultiplayer && myPlayerType === 'PLAYER2' && <span className="you-badge"> (You)</span>}
        </div>
        <div className="score-value" style={{ color: player2?.color }}>
          {player2?.score.toFixed(2) || '0.00'}
        </div>
        {isPlayer2Turn && !gameOver && (
          <div className="turn-indicator">
            {isMultiplayer && myPlayerType === 'PLAYER2' ? 'Your Turn' : `${player2Label}'s Turn`}
          </div>
        )}
      </div>

      {gameOver && (
        <div className="game-over-banner">
          <h2>Game Over!</h2>
          {isMultiplayer ? (
            <>
              {winner === myPlayerType && <p className="winner-text">You Win! 🎉</p>}
              {winner && winner !== myPlayerType && <p className="loser-text">{winner === 'PLAYER1' ? player1Label : player2Label} Wins!</p>}
              {!winner && <p className="tie-text">It's a Tie!</p>}
            </>
          ) : (
            <>
              {winner === 'HUMAN' && <p className="winner-text">You Win! 🎉</p>}
              {winner === 'COMPUTER' && <p className="loser-text">Computer Wins!</p>}
              {!winner && <p className="tie-text">It's a Tie!</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ScoreDisplay;
