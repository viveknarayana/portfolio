import './PlayerHand.css';

const CARD_DISPLAY_NAMES = {
  LEFT_RIEMANN: 'Left Riemann',
  RIGHT_RIEMANN: 'Right Riemann',
  MIDPOINT_RIEMANN: 'Midpoint Riemann',
  INTEGRAL: 'Definite Integral',
};

const CARD_ICONS = {
  LEFT_RIEMANN: '◧',
  RIGHT_RIEMANN: '◨',
  MIDPOINT_RIEMANN: '▬',
  INTEGRAL: '∫',
};

const PlayerHand = ({ hand, selectedCard, onCardSelect, disabled }) => {
  return (
    <div className="player-hand">
      <h3 className="hand-title">Your Hand</h3>
      <div className="cards-container">
        {hand.map((card, index) => (
          <button
            key={index}
            className={`card ${selectedCard === card ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={() => !disabled && onCardSelect(card)}
            disabled={disabled}
          >
            <div className="card-icon">{CARD_ICONS[card]}</div>
            <div className="card-name">{CARD_DISPLAY_NAMES[card]}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlayerHand;
