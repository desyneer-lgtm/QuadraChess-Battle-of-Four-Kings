// ===============================
// QuadraChess Socket Connection
// ===============================

// Automatically connect to same server
const QC_Socket = {
  init: function() {
    this.socket = io({
      transports: ["websocket", "polling"]
    });

    this.socket.on("connect", () => {
      console.log("✅ Connected to server:", this.socket.id);
    });

    this.socket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    });
  },

  sendMove: function(data) {
    if (!this.socket) return console.error("Socket not initialized!");
    this.socket.emit("move", data);
  },

  onMove: function(handler) {
    if (!this.socket) return console.error("Socket not initialized!");
    this.socket.on("move", handler);
  }
};

// Start connection when the page loads
QC_Socket.init();
