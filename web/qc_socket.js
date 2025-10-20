// ===============================
// QuadraChess Socket Connection
// ===============================

// 👇 Replace this with your actual Render server URL
// Example: "https://quadrachess.onrender.com"
const RENDER_SERVER_URL = "https://quadrachess-battle-of-four-kings.onrender.com"; 

// Socket wrapper object
const QC_Socket = {
  // Initialize the connection to your backend
  init: function(serverUrl = RENDER_SERVER_URL) {
    this.socket = io(serverUrl, {
      transports: ["websocket", "polling"]
    });

    this.socket.on("connect", () => {
      console.log("✅ Connected to server:", this.socket.id);
    });

    this.socket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    });
  },

  // Send a move (piece movement or special action)
  sendMove: function(data) {
    if (!this.socket) {
      console.error("Socket not initialized!");
      return;
    }
    this.socket.emit("move", data);
  },

  // Listen for moves from other players
  onMove: function(handler) {
    if (!this.socket) {
      console.error("Socket not initialized!");
      return;
    }
    this.socket.on("move", handler);
  }
};

// Initialize immediately when the page loads
QC_Socket.init();
