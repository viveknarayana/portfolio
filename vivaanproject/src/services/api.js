import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createGame = async (numSubintervals = 10) => {
  const response = await api.post('/game/new', {
    num_subintervals: numSubintervals,
  });
  return response.data;
};

export const getGameState = async (gameId) => {
  const response = await api.get(`/game/${gameId}`);
  return response.data;
};

export const makeMove = async (gameId, cardType, deckChoice) => {
  const response = await api.post(`/game/${gameId}/move`, {
    card_type: cardType,
    deck_choice: deckChoice,
  });
  return response.data;
};

export const makeAIMove = async (gameId) => {
  const response = await api.post(`/game/${gameId}/ai-move`);
  return response.data;
};

export const getGameStatus = async (gameId) => {
  const response = await api.get(`/game/${gameId}/status`);
  return response.data;
};

// Multiplayer room functions
export const createRoom = async (username, numSubintervals = 10) => {
  const response = await api.post('/room/create', { 
    username,
    num_subintervals: numSubintervals 
  });
  return response.data;
};

export const joinRoom = async (roomCode, username) => {
  const response = await api.post(`/room/${roomCode}/join`, { username });
  return response.data;
};

export const getRoomStatus = async (roomCode) => {
  const response = await api.get(`/room/${roomCode}/status`);
  return response.data;
};

export const setPlayerReady = async (roomCode, playerId, ready = true) => {
  const response = await api.post(`/room/${roomCode}/ready`, {
    player_id: playerId,
    ready
  });
  return response.data;
};

export const startGame = async (roomCode, playerId, numSubintervals = 10) => {
  const response = await api.post(`/room/${roomCode}/start`, {
    player_id: playerId,
    num_subintervals: numSubintervals
  });
  return response.data;
};

export const leaveRoom = async (roomCode, playerId) => {
  const response = await api.post(`/room/${roomCode}/leave`, null, {
    params: { player_id: playerId }
  });
  return response.data;
};

export default api;
