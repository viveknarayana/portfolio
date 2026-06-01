import './DeckSelector.css';

const DeckSelector = ({ onDeckSelect, disabled, drawnNumbers, turnCount = 0 }) => {
  // After turn 5 (5 complete rounds), show combined deck
  const showCombinedDeck = turnCount >= 5;
  
  return (
    <div className="deck-selector">
      <h3 className="deck-title">Choose Interval Deck</h3>
      <div className="deck-buttons">
        {showCombinedDeck ? (
          <button
            className="deck-button deck-combined"
            onClick={() => onDeckSelect('0-10')}
            disabled={disabled}
          >
            <span className="deck-range">0 - 10</span>
            <span className="deck-label">Combined Deck</span>
          </button>
        ) : (
          <>
            <button
              className="deck-button deck-low"
              onClick={() => onDeckSelect('0-5')}
              disabled={disabled}
            >
              <span className="deck-range">0 - 5</span>
            </button>
            <button
              className="deck-button deck-high"
              onClick={() => onDeckSelect('6-10')}
              disabled={disabled}
            >
              <span className="deck-range">6 - 10</span>
            </button>
          </>
        )}
      </div>
      
      {drawnNumbers && drawnNumbers.length === 2 && (
        <div className="drawn-numbers">
          <p>Interval: <strong>[{Math.round(drawnNumbers[0])}, {Math.round(drawnNumbers[1])}]</strong></p>
        </div>
      )}
    </div>
  );
};

export default DeckSelector;
