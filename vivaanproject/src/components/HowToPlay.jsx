import { useState, useEffect, useCallback } from 'react';
import './HowToPlay.css';

const INSTRUCTION_PAGES = [
  {
    title: 'Overview',
    content: (
      <p>
        Riemann Wars is a turn-based strategy game on the interval [0, 10]. Each player
        uses calculus cards to claim territory under a random function and earn points.
        Capture high-value areas, contest your opponent&apos;s land, and end with the highest score.
      </p>
    ),
  },
  {
    title: 'Your Turn',
    content: (
      <ol>
        <li>Select a card from your hand.</li>
        <li>Choose an interval deck: <strong>0–5</strong> or <strong>6–10</strong>.</li>
        <li>Two random numbers are drawn from that deck to form your interval [a, b].</li>
        <li>Your card calculates the area under the curve on that interval and colors it on the graph.</li>
        <li>After your move, the played card is replaced with a new random card from the deck.</li>
        <li>After <strong>5 complete rounds</strong>, the two decks merge into one combined <strong>0–10</strong> deck for the rest of the game.</li>
      </ol>
    ),
  },
  {
    title: 'Card Types',
    content: (
      <>
        <ul className="card-type-list">
          <li>
            <span className="card-icon">◧</span>
            <strong className="card-name">Left Riemann Sum</strong>
            <span className="card-dash">--</span>
            <span className="card-desc">uses the left endpoint of each subinterval</span>
          </li>
          <li>
            <span className="card-icon">◨</span>
            <strong className="card-name">Right Riemann Sum</strong>
            <span className="card-dash">--</span>
            <span className="card-desc">uses the right endpoint of each subinterval</span>
          </li>
          <li>
            <span className="card-icon">▬</span>
            <strong className="card-name">Midpoint Riemann Sum</strong>
            <span className="card-dash">--</span>
            <span className="card-desc">uses the midpoint of each subinterval</span>
          </li>
          <li>
            <span className="card-icon">∫</span>
            <strong className="card-name">Definite Integral</strong>
            <span className="card-dash">--</span>
            <span className="card-desc">exact integral value (most accurate)</span>
          </li>
        </ul>
        <p className="instructions-note">
          The number of subintervals you set before the game controls how many rectangles Riemann cards use.
          More subintervals generally means better approximations.
        </p>
      </>
    ),
  },
  {
    title: 'How Score Is Calculated',
    content: (
      <ul>
        <li>Each move splits area into <strong>positive</strong> (above the x-axis) and <strong>negative</strong> (below the x-axis) parts.</li>
        <li><strong>Positive area</strong> is added to your score.</li>
        <li><strong>Negative area</strong> is subtracted from your opponent&apos;s score.</li>
        <li>Riemann cards score the sum of their rectangle areas; the integral card scores the exact integral.</li>
      </ul>
    ),
  },
  {
    title: 'Territory & Contesting',
    content: (
      <ul>
        <li>Every successful move claims an interval on the graph in your color.</li>
        <li>If your interval overlaps an opponent&apos;s territory, you take the overlapping region.</li>
        <li>The opponent loses the points they had from the contested portion; their remaining pieces are recalculated.</li>
        <li>Strategic overlaps can both grow your score and shrink your opponent&apos;s.</li>
      </ul>
    ),
  },
  {
    title: 'How the Game Ends',
    content: (
      <ul>
        <li>The game ends when the entire interval <strong>[0, 10]</strong> is covered by claimed territory, <em>or</em></li>
        <li>After <strong>10 complete rounds</strong> (both players have taken 10 turns each).</li>
        <li>The player with the <strong>highest score</strong> wins. If scores are tied, the game is a draw.</li>
      </ul>
    ),
  },
  {
    title: 'Game Modes',
    content: (
      <ul>
        <li><strong>Single Player</strong> — play against an AI opponent that picks high-value moves.</li>
        <li><strong>Multiplayer</strong> — create or join a room and play against a friend in real time.</li>
      </ul>
    ),
  },
];

const HowToPlay = ({ onBack }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const lastPage = INSTRUCTION_PAGES.length - 1;

  const goToPage = useCallback((nextIndex) => {
    setPageIndex(Math.max(0, Math.min(nextIndex, lastPage)));
  }, [lastPage]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        goToPage(pageIndex + 1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        goToPage(pageIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPage, pageIndex]);

  const currentPage = INSTRUCTION_PAGES[pageIndex];

  return (
    <div className="how-to-play-page">
      <h2>How to Play</h2>

      <div className="instructions-viewport" aria-live="polite">
        <section className="instructions-section" key={pageIndex}>
          <h3>{currentPage.title}</h3>
          {currentPage.content}
        </section>
      </div>

      <div className="instructions-nav">
        <button
          type="button"
          className="nav-arrow"
          onClick={() => goToPage(pageIndex - 1)}
          disabled={pageIndex === 0}
          aria-label="Previous section"
        >
          ↑
        </button>

        <div className="page-indicator">
          <span className="page-count">{pageIndex + 1} / {INSTRUCTION_PAGES.length}</span>
          <span className="nav-hint">Use ↑ ↓</span>
        </div>

        <button
          type="button"
          className="nav-arrow"
          onClick={() => goToPage(pageIndex + 1)}
          disabled={pageIndex === lastPage}
          aria-label="Next section"
        >
          ↓
        </button>
      </div>

      <button className="how-to-play-back-button" onClick={onBack}>
        Back to Menu
      </button>
    </div>
  );
};

export default HowToPlay;
