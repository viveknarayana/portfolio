import { useState } from 'react';
import './StartScreen.css';
import MultiplayerMenu from './MultiplayerMenu';
import RoomLobby from './RoomLobby';
import HowToPlay from './HowToPlay';
import GameWebSocket from '../services/websocket';
import ParticleBackground from './ParticleBackground';

const StartScreen = ({ onStartGame, onStartMultiplayerGame }) => {
  const [subintervals, setSubintervals] = useState(10);
  const [mode, setMode] = useState('menu'); // 'menu', 'singleplayer', 'multiplayer', 'lobby', 'howto'
  const [roomInfo, setRoomInfo] = useState(null);
  const [multiplayerInfo, setMultiplayerInfo] = useState(null);

  const handleSinglePlayerStart = () => {
    onStartGame(subintervals);
  };

  const handleMultiplayerClick = () => {
    setMode('multiplayer');
  };

  const handleRoomCreated = (roomCode, playerId, username, roomData) => {
    // Set up WebSocket connection when joining lobby
    const ws = new GameWebSocket();
    ws.connect(roomCode, playerId, handleWebSocketMessage, null);
    
    const info = {
      roomCode,
      playerId,
      websocket: ws,
      roomData
    };
    
    setRoomInfo({ roomCode, playerId, username, roomData });
    setMultiplayerInfo(info);
    setMode('lobby');
  };

  const handleRoomJoined = (roomCode, playerId, username, roomData) => {
    // Set up WebSocket connection when joining lobby
    const ws = new GameWebSocket();
    ws.connect(roomCode, playerId, handleWebSocketMessage, null);
    
    const info = {
      roomCode,
      playerId,
      websocket: ws,
      roomData
    };
    
    setRoomInfo({ roomCode, playerId, username, roomData });
    setMultiplayerInfo(info);
    setMode('lobby');
  };

  const handleWebSocketMessage = (message) => {
    console.log('[StartScreen] WebSocket message:', message);
    
    if (message.type === 'game_started') {
      // Get fresh values from state using functional approach
      setRoomInfo(currentRoomInfo => {
        setMultiplayerInfo(currentMultiInfo => {
          const ws = currentMultiInfo?.websocket;
          const roomCode = currentRoomInfo?.roomCode;
          const playerId = currentRoomInfo?.playerId;
          const roomData = {
            ...currentMultiInfo?.roomData,
            playerMapping: message.data.player_mapping
          };
          
          console.log('[StartScreen] Passing to App:', { playerId, roomCode, playerMapping: message.data.player_mapping });
          
          onStartMultiplayerGame(message.data.game_state, roomCode, playerId, roomData, ws);
          
          return currentMultiInfo;
        });
        return currentRoomInfo;
      });
    }
  };

  const handleGameStart = (gameState, roomData) => {
    // Game start is now handled by WebSocket message in App.jsx
    // This callback is no longer needed but kept for compatibility
  };

  const handleLeave = () => {
    setRoomInfo(null);
    setMode('menu');
  };

  const handleBackToMenu = () => {
    setMode('menu');
  };

  const handleHowToPlayClick = () => {
    setMode('howto');
  };

  if (mode === 'howto') {
    return (
      <div className="start-screen">
        <ParticleBackground />
        <HowToPlay onBack={handleBackToMenu} />
      </div>
    );
  }

  if (mode === 'multiplayer') {
    return (
      <div className="start-screen">
        <ParticleBackground />
        <MultiplayerMenu
          onRoomCreated={handleRoomCreated}
          onRoomJoined={handleRoomJoined}
          onBack={handleBackToMenu}
        />
      </div>
    );
  }

  if (mode === 'lobby' && roomInfo) {
    return (
      <div className="start-screen">
        <ParticleBackground />
        <RoomLobby
          roomCode={roomInfo.roomCode}
          playerId={roomInfo.playerId}
          username={roomInfo.username}
          initialRoomData={roomInfo.roomData}
          onGameStart={handleGameStart}
          onLeave={handleLeave}
        />
      </div>
    );
  }

  return (
    <div className="start-screen">
      <ParticleBackground />
      <div className="start-content">
        <h1 className="game-title">Riemann Wars</h1>
        <p className="game-subtitle">Capture the Area Under the Curve</p>
        
        <div className="mode-selection">
          <button onClick={handleSinglePlayerStart} className="play-button primary">
            Single Player (vs AI)
          </button>
          <button onClick={handleMultiplayerClick} className="play-button secondary">
            Multiplayer (vs Friend)
          </button>
          <button onClick={handleHowToPlayClick} className="play-button tertiary">
            How to Play
          </button>
        </div>

        <div className="settings-panel">
          <label htmlFor="subintervals" className="setting-label">
            Number of Subintervals:
          </label>
          <input
            id="subintervals"
            type="number"
            min="1"
            max="50"
            value={subintervals}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value > 0 || e.target.value === '') {
                setSubintervals(value || 1);
              }
            }}
            onBlur={(e) => {
              const value = parseInt(e.target.value);
              if (!value || value < 1) {
                setSubintervals(1);
              }
            }}
            className="subinterval-input"
          />
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
