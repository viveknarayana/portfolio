import { useState } from 'react';
import './MultiplayerMenu.css';
import { createRoom, joinRoom } from '../services/api';

const MultiplayerMenu = ({ onRoomCreated, onRoomJoined, onBack }) => {
  const [createUsername, setCreateUsername] = useState('');
  const [joinUsername, setJoinUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [numSubintervals, setNumSubintervals] = useState(10);
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  const handleCreateRoom = async () => {
    if (!createUsername.trim()) {
      setError('Please enter a username');
      return;
    }

    setIsCreating(true);
    setError('');

    try {
      const response = await createRoom(createUsername.trim(), numSubintervals);
      if (response.success) {
        onRoomCreated(response.room_code, response.player_id, createUsername.trim(), response.room_data);
      } else {
        setError('Failed to create room');
      }
    } catch (err) {
      console.error('Error creating room:', err);
      setError(err.response?.data?.detail || 'Failed to create room');
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!joinUsername.trim()) {
      setError('Please enter a username');
      return;
    }

    if (!roomCode.trim()) {
      setError('Please enter a room code');
      return;
    }

    setIsJoining(true);
    setError('');

    try {
      const response = await joinRoom(roomCode.trim().toUpperCase(), joinUsername.trim());
      if (response.success) {
        onRoomJoined(response.room_code, response.player_id, joinUsername.trim(), response.room_data);
      } else {
        setError('Failed to join room');
      }
    } catch (err) {
      console.error('Error joining room:', err);
      setError(err.response?.data?.detail || 'Failed to join room');
    } finally {
      setIsJoining(false);
    }
  };

  const handleCreateUsernameKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateRoom();
    }
  };

  const handleRoomCodeKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleJoinRoom();
    }
  };

  return (
    <div className="multiplayer-menu">
      <h2>Multiplayer</h2>

      <div className="menu-section">
        <h3>Create Room</h3>
        <div className="input-group">
          <label>Your Username</label>
          <input
            type="text"
            name="create-username"
            autoComplete="off"
            value={createUsername}
            onChange={(e) => setCreateUsername(e.target.value)}
            onKeyPress={handleCreateUsernameKeyPress}
            placeholder="Enter your name"
            maxLength={20}
            disabled={isCreating}
          />
        </div>
        <div className="input-group">
          <label>Number of Subintervals</label>
          <input
            type="number"
            min="1"
            max="50"
            value={numSubintervals}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value > 0 || e.target.value === '') {
                setNumSubintervals(value || 1);
              }
            }}
            onBlur={(e) => {
              const value = parseInt(e.target.value);
              if (!value || value < 1) {
                setNumSubintervals(1);
              }
            }}
            disabled={isCreating}
            className="subinterval-input"
          />
        </div>
        <button
          className="menu-button primary"
          onClick={handleCreateRoom}
          disabled={isCreating || !createUsername.trim()}
        >
          {isCreating ? 'Creating...' : 'Create Room'}
        </button>
      </div>

      <div className="divider">OR</div>

      <div className="menu-section">
        <h3>Join Room</h3>
        <div className="input-group">
          <label>Your Username</label>
          <input
            type="text"
            name="join-username"
            autoComplete="off"
            value={joinUsername}
            onChange={(e) => setJoinUsername(e.target.value)}
            placeholder="Enter your name"
            maxLength={20}
            disabled={isJoining}
          />
        </div>
        <div className="input-group">
          <label>Room Code</label>
          <input
            type="text"
            name="room-code"
            autoComplete="off"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            onKeyPress={handleRoomCodeKeyPress}
            placeholder="Enter 6-character code"
            maxLength={6}
            disabled={isJoining}
          />
        </div>
        <button
          className="menu-button secondary"
          onClick={handleJoinRoom}
          disabled={isJoining || !joinUsername.trim() || !roomCode.trim()}
        >
          {isJoining ? 'Joining...' : 'Join Room'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button className="menu-button primary back-button" onClick={onBack}>
        Back to Menu
      </button>
    </div>
  );
};

export default MultiplayerMenu;
