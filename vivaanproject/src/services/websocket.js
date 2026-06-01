class GameWebSocket {
  constructor() {
    this.ws = null;
    this.roomCode = null;
    this.playerId = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 2000;
    this.messageHandlers = [];
    this.closeHandlers = [];
    this.isIntentionallyClosed = false;
  }

  connect(roomCode, playerId, onMessage, onClose) {
    this.roomCode = roomCode;
    this.playerId = playerId;
    this.isIntentionallyClosed = false;

    if (onMessage) {
      this.messageHandlers.push(onMessage);
    }
    if (onClose) {
      this.closeHandlers.push(onClose);
    }

    const wsBase = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000';
    const wsUrl = `${wsBase}/api/ws/${roomCode}/${playerId}`;
    console.log('[WebSocket] Connecting to:', wsUrl);

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('[WebSocket] Connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('[WebSocket] Received:', message);
        
        // Call all registered message handlers
        this.messageHandlers.forEach(handler => {
          try {
            handler(message);
          } catch (error) {
            console.error('[WebSocket] Error in message handler:', error);
          }
        });
      } catch (error) {
        console.error('[WebSocket] Error parsing message:', error);
      }
    };

    this.ws.onerror = (error) => {
      console.error('[WebSocket] Error:', error);
    };

    this.ws.onclose = (event) => {
      console.log('[WebSocket] Disconnected', event.code, event.reason);
      
      // Call all registered close handlers
      this.closeHandlers.forEach(handler => {
        try {
          handler(event);
        } catch (error) {
          console.error('[WebSocket] Error in close handler:', error);
        }
      });

      // Attempt to reconnect if not intentionally closed
      if (!this.isIntentionallyClosed && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        console.log(`[WebSocket] Reconnecting... (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        
        setTimeout(() => {
          if (!this.isIntentionallyClosed) {
            this.connect(this.roomCode, this.playerId);
          }
        }, this.reconnectDelay * this.reconnectAttempts);
      }
    };
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('[WebSocket] Sending:', message);
      this.ws.send(JSON.stringify(message));
      return true;
    } else {
      console.error('[WebSocket] Cannot send - connection not open');
      return false;
    }
  }

  sendMove(gameId, playerType, cardType, deckChoice) {
    return this.send({
      type: 'move',
      data: {
        game_id: gameId,
        player_type: playerType,
        card_type: cardType,
        deck_choice: deckChoice
      }
    });
  }

  close() {
    this.isIntentionallyClosed = true;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.messageHandlers = [];
    this.closeHandlers = [];
  }

  isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }
}

export default GameWebSocket;
