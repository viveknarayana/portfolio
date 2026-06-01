import { useState, useEffect } from 'react';
import './RoomLobby.css';
import { setPlayerReady, startGame, leaveRoom, getRoomStatus } from '../services/api';

const RoomLobby = ({ roomCode, playerId, username, initialRoomData, onGameStart, onLeave }) => {
  const [roomData, setRoomData] = useState(initialRoomData);
  const [isReady, setIsReady] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState('');

  // Poll for room updates
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await getRoomStatus(roomCode);
        if (response.success) {
          setRoomData(response.room);
        }
      } catch (err) {
        console.error('Error fetching room status:', err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [roomCode]);

  const handleReadyToggle = async () => {
    try {
      setError('');
      const newReadyState = !isReady;
      await setPlayerReady(roomCode, playerId, newReadyState);
      setIsReady(newReadyState);
    } catch (err) {
      console.error('Error toggling ready:', err);
      setError(err.response?.data?.detail || 'Failed to update ready status');
    }
  };

  const handleStartGame = async () => {
    setIsStarting(true);
    setError('');

    try {
      // Use the room's configured subintervals setting
      const numSubintervals = roomData?.num_subintervals || 10;
      await startGame(roomCode, playerId, numSubintervals);
      // Don't call onGameStart here - let the WebSocket message handle it
      // Both players will receive game_started via WebSocket
    } catch (err) {
      console.error('Error starting game:', err);
      setError(err.response?.data?.detail || 'Failed to start game');
      setIsStarting(false);
    }
  };

  const handleLeave = async () => {
    try {
      await leaveRoom(roomCode, playerId);
      onLeave();
    } catch (err) {
      console.error('Error leaving room:', err);
      onLeave(); // Leave anyway
    }
  };

  const currentPlayer = roomData?.players?.find(p => p.player_id === playerId);
  const otherPlayers = roomData?.players?.filter(p => p.player_id !== playerId) || [];
  const allReady = roomData?.players?.every(p => p.ready) && roomData?.is_full;
  const canStart = allReady && roomData?.status === 'ready';

  return (
    <div className="room-lobby">
      <h2>Game Lobby</h2>

      <div className="room-code-display">
        <div className="room-code-label">Room Code</div>
        <div className="room-code">{roomCode}</div>
        <div className="room-code-hint">Share this code with your friend!</div>
      </div>

      <div className="game-settings">
        <h3>Game Settings</h3>
        <div className="setting-item">
          <span className="setting-label">Subintervals:</span>
          <span className="setting-value">{roomData?.num_subintervals || 10}</span>
        </div>
      </div>

      <div className="players-section">
        <h3>Players ({roomData?.player_count || 0}/2)</h3>
        <div className="player-list">
          {currentPlayer && (
            <div className="player-item">
              <div className="player-info">
                <div className="player-icon" style={{ background: '#2E86DE' }}>
                  {currentPlayer.username.charAt(0).toUpperCase()}
                </div>
                <div className="player-details">
                  <div className="player-name">{currentPlayer.username}</div>
                  <div className="player-you">(You)</div>
                </div>
              </div>
              <div className="player-status">
                {currentPlayer.ready ? (
                  <span className="status-badge ready">Ready</span>
                ) : (
                  <span className="status-badge waiting">Waiting</span>
                )}
              </div>
            </div>
          )}

          {otherPlayers.map((player, index) => (
            <div key={player.player_id} className="player-item">
              <div className="player-info">
                <div className="player-icon" style={{ background: '#EE5A6F' }}>
                  {player.username.charAt(0).toUpperCase()}
                </div>
                <div className="player-details">
                  <div className="player-name">{player.username}</div>
                </div>
              </div>
              <div className="player-status">
                {!player.connected ? (
                  <span className="status-badge disconnected">Disconnected</span>
                ) : player.ready ? (
                  <span className="status-badge ready">Ready</span>
                ) : (
                  <span className="status-badge waiting">Waiting</span>
                )}
              </div>
            </div>
          ))}

          {!roomData?.is_full && (
            <div className="empty-slot">
              <span className="loading-dots">Waiting for player to join</span>
            </div>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="lobby-actions">
        {!roomData?.is_full ? (
          <div className="waiting-message">
            Waiting for another player to join...
          </div>
        ) : (
          <>
            <button
              className={`lobby-button ${isReady ? 'unready' : 'ready'}`}
              onClick={handleReadyToggle}
              disabled={isStarting}
            >
              {isReady ? 'Not Ready' : 'Ready'}
            </button>

            {canStart && (
              <button
                className="lobby-button start"
                onClick={handleStartGame}
                disabled={isStarting}
              >
                {isStarting ? 'Starting...' : 'Start Game'}
              </button>
            )}
          </>
        )}

        <button
          className="lobby-button leave"
          onClick={handleLeave}
          disabled={isStarting}
        >
          Leave Room
        </button>
      </div>
    </div>
  );
};

export default RoomLobby;
