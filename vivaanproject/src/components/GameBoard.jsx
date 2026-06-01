import { useState, useEffect } from 'react';
import DesmosGraph from './DesmosGraph';
import PlayerHand from './PlayerHand';
import DeckSelector from './DeckSelector';
import ScoreDisplay from './ScoreDisplay';
import { makeMove, makeAIMove } from '../services/api';
import './GameBoard.css';

const GameBoard = ({ gameState: initialGameState, onBackToMenu, isMultiplayer = false, multiplayerInfo = null }) => {
  const [gameState, setGameState] = useState(initialGameState);
  const [selectedCard, setSelectedCard] = useState(null);
  const [drawnNumbers, setDrawnNumbers] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('Select a card from your hand');
  const [opponentDisconnected, setOpponentDisconnected] = useState(false);

  // Subscribe to WebSocket updates for multiplayer
  useEffect(() => {
    if (isMultiplayer && multiplayerInfo?.websocket) {
      const ws = multiplayerInfo.websocket;
      
      const handleMessage = (message) => {
        console.log('[GameBoard] WebSocket message:', message);
        
        if (message.type === 'game_update') {
          setGameState(message.data.game_state);
          setDrawnNumbers(message.data.drawn_numbers);
          setSelectedCard(null);
          setIsProcessing(false);
        } else if (message.type === 'game_over') {
          setGameState(message.data.game_state);
          if (message.data.reason === 'opponent_disconnected') {
            setMessage('You Win! Opponent disconnected.');
          } else {
            setMessage('Game Over!');
          }
          setIsProcessing(false);
          setOpponentDisconnected(false);
        } else if (message.type === 'player_disconnected') {
          setOpponentDisconnected(true);
          setMessage('Opponent disconnected! Waiting...');
        } else if (message.type === 'player_reconnected') {
          setOpponentDisconnected(false);
        }
      };
      
      ws.messageHandlers.push(handleMessage);
      
      return () => {
        const index = ws.messageHandlers.indexOf(handleMessage);
        if (index > -1) {
          ws.messageHandlers.splice(index, 1);
        }
      };
    }
  }, [isMultiplayer, multiplayerInfo]);

  useEffect(() => {
    const myPlayerType = isMultiplayer ? getMyPlayerType() : 'HUMAN';
    
    console.log('[GameBoard] Current game state:', {
      turn_count: gameState.turn_count,
      current_turn: gameState.current_turn,
      game_over: gameState.game_over,
      myPlayerType: myPlayerType,
      isMultiplayer: isMultiplayer,
      multiplayerInfo: multiplayerInfo
    });
    
    if (isMultiplayer) {
      // Multiplayer mode
      const isMyTurn = gameState.current_turn === myPlayerType;
      
      if (gameState.game_over) {
        setMessage('Game Over!');
      } else if (isMyTurn) {
        const turnNumber = (gameState.turn_count || 0) + 1;
        setMessage(`Turn ${turnNumber}/10 - Your turn! Select a card.`);
      } else {
        setMessage('Waiting for opponent...');
      }
    } else {
      // Single player mode
      if (gameState.current_turn === 'COMPUTER' && !gameState.game_over) {
        handleAITurn();
      } else if (gameState.current_turn === 'HUMAN' && !gameState.game_over) {
        const turnNumber = (gameState.turn_count || 0) + 1;
        setMessage(`Turn ${turnNumber}/10 - Select a card from your hand`);
      }
    }
  }, [gameState.current_turn, gameState.game_over, gameState.turn_count, isMultiplayer]);

  const getMyPlayerType = () => {
    if (!isMultiplayer || !multiplayerInfo) {
      console.log('[GameBoard] Not multiplayer or no info, returning HUMAN');
      return 'HUMAN';
    }
    
    console.log('[GameBoard] Full multiplayerInfo:', multiplayerInfo);
    
    // Use player mapping from roomData (set by StartScreen from game_started message)
    if (multiplayerInfo.roomData?.playerMapping) {
      const mapping = multiplayerInfo.roomData.playerMapping;
      const myId = multiplayerInfo.playerId;
      const myType = mapping[myId];
      console.log('[GameBoard] Player mapping:', mapping, 'My ID:', myId, 'My type:', myType);
      
      if (myType) {
        return myType;
      }
    }
    
    // Fallback: determine by room order (before game starts)
    const players = multiplayerInfo.roomData?.players || [];
    const myId = multiplayerInfo.playerId;
    const myIndex = players.findIndex(p => p.player_id === myId);
    const fallbackType = myIndex === 0 ? 'PLAYER1' : 'PLAYER2';
    console.log('[GameBoard] Using fallback. My ID:', myId, 'Index:', myIndex, 'Type:', fallbackType);
    return fallbackType;
  };

  const canMakeMove = () => {
    if (gameState.game_over || isProcessing || opponentDisconnected) return false;
    
    if (isMultiplayer) {
      const myPlayerType = getMyPlayerType();
      return gameState.current_turn === myPlayerType;
    }
    
    return gameState.current_turn === 'HUMAN';
  };

  const handleCardSelect = (card) => {
    if (!canMakeMove()) return;
    
    setSelectedCard(card);
    setDrawnNumbers(null);
    const turnNumber = (gameState.turn_count || 0) + 1;
    setMessage(`Turn ${turnNumber}/10 - Choose an interval deck`);
  };

  const handleDeckSelect = async (deck) => {
    if (!selectedCard) {
      setMessage('Please select a card first!');
      return;
    }

    if (!canMakeMove()) {
      setMessage("It's not your turn!");
      return;
    }

    setIsProcessing(true);
    setMessage('Processing your move...');

    try {
      if (isMultiplayer) {
        // Send move via WebSocket
        const myPlayerType = getMyPlayerType();
        const success = multiplayerInfo.websocket.sendMove(
          gameState.game_id,
          myPlayerType,
          selectedCard,
          deck
        );
        
        if (!success) {
          throw new Error('Failed to send move via WebSocket');
        }
        
        // Wait for WebSocket response to update state
        setMessage('Waiting for server...');
      } else {
        // Single player mode - use HTTP API
        const response = await makeMove(gameState.game_id, selectedCard, deck);
        
        if (response.success) {
          setGameState(response.game_state);
          setDrawnNumbers(response.drawn_numbers);
          setSelectedCard(null);
          setMessage('Move complete! Waiting for computer...');
        }
      }
    } catch (error) {
      console.error('Error making move:', error);
      setMessage('Error making move. Please try again.');
      setIsProcessing(false);
      setSelectedCard(null);
    } finally {
      if (!isMultiplayer) {
        setIsProcessing(false);
      }
    }
  };

  const handleAITurn = async () => {
    if (isMultiplayer) return; // No AI in multiplayer
    
    setIsProcessing(true);
    setMessage('Computer is thinking...');

    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const response = await makeAIMove(gameState.game_id);
      
      if (response.success) {
        setGameState(response.game_state);
        if (!response.game_state.game_over) {
          setMessage('Your turn! Select a card.');
        } else {
          setMessage('Game Over!');
        }
      }
    } catch (error) {
      console.error('Error making AI move:', error);
      console.error('Error response:', error.response?.data);
      
      // Allow player to continue by switching turn back to human
      const updatedState = {
        ...gameState,
        current_turn: 'HUMAN'
      };
      setGameState(updatedState);
      setMessage('AI move failed - your turn again. Try refreshing if issues persist.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNewGame = () => {
    onBackToMenu();
  };

  return (
    <div className="game-board">
      <div className="game-header">
        <button onClick={handleNewGame} className="game-back-button">
          ← New Game
        </button>
        <h2 className="game-title-small">Riemann Wars</h2>
        {opponentDisconnected && (
          <div className="disconnect-warning">⚠️ Opponent Disconnected</div>
        )}
      </div>

      <div className="game-container">
        <div className="left-panel">
          <ScoreDisplay
            players={gameState.players}
            currentTurn={gameState.current_turn}
            gameOver={gameState.game_over}
            winner={gameState.winner}
            isMultiplayer={isMultiplayer}
            myPlayerType={getMyPlayerType()}
          />
          <DesmosGraph
            functionStr={gameState.function_display}
            moves={gameState.moves}
            intervals={gameState.intervals}
            yMin={gameState.y_min}
            yMax={gameState.y_max}
          />
        </div>

        <div className="right-panel">
          <div className="status-message">{message}</div>
          
          <PlayerHand
            hand={isMultiplayer ? gameState.players[getMyPlayerType()]?.hand || [] : gameState.players.HUMAN?.hand || []}
            selectedCard={selectedCard}
            onCardSelect={handleCardSelect}
            disabled={!canMakeMove() || isProcessing || gameState.game_over}
          />

          <DeckSelector
            onDeckSelect={handleDeckSelect}
            disabled={!selectedCard || !canMakeMove() || isProcessing || gameState.game_over}
            drawnNumbers={drawnNumbers}
            turnCount={gameState.turn_count}
          />

          {gameState.game_over && (
            <button onClick={handleNewGame} className="new-game-button">
              Play Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
