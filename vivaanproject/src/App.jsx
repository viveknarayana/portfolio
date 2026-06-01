import { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameBoard from './components/GameBoard';
import { createGame } from './services/api';
import GameWebSocket from './services/websocket';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [multiplayerInfo, setMultiplayerInfo] = useState(null); // { roomCode, playerId, websocket, roomData }

  const handleStartGame = async (subintervals) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createGame(subintervals);
      if (response.success) {
        setGameState(response.game_state);
        setMultiplayerInfo(null); // Single player mode
      } else {
        setError('Failed to create game');
      }
    } catch (err) {
      console.error('Error creating game:', err);
      setError('Failed to connect to server. Make sure the backend is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartMultiplayerGame = (gameState, roomCode, playerId, roomData, websocket) => {
    // Game state and WebSocket connection passed from StartScreen
    console.log('[App] Starting multiplayer game:', {
      playerId,
      roomData,
      playerMapping: roomData?.playerMapping
    });
    
    setGameState(gameState);
    
    setMultiplayerInfo({
      roomCode,
      playerId,
      websocket: websocket,
      roomData
    });
  };

  const handleWebSocketMessage = (message) => {
    console.log('[App] WebSocket message:', message);
    
    if (message.type === 'game_started') {
      // Both players receive the same game state via WebSocket
      // Player mapping already passed via StartScreen
      setGameState(message.data.game_state);
    } else if (message.type === 'game_update') {
      setGameState(message.data.game_state);
    } else if (message.type === 'game_over') {
      setGameState(message.data.game_state);
    }
  };

  const handleWebSocketClose = (event) => {
    console.log('[App] WebSocket closed:', event);
  };

  const handleBackToMenu = () => {
    // Close WebSocket if multiplayer
    if (multiplayerInfo?.websocket) {
      multiplayerInfo.websocket.close();
    }
    
    setGameState(null);
    setMultiplayerInfo(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Creating game...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={handleBackToMenu} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      {!gameState ? (
        <StartScreen 
          onStartGame={handleStartGame}
          onStartMultiplayerGame={handleStartMultiplayerGame}
        />
      ) : (
        <GameBoard 
          gameState={gameState} 
          onBackToMenu={handleBackToMenu}
          isMultiplayer={!!multiplayerInfo}
          multiplayerInfo={multiplayerInfo}
        />
      )}
    </div>
  );
}

export default App;
