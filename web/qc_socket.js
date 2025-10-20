const QC_Socket = {
  init: function("https://quadrachess-battle-of-four-kings.onrender.com") {
    this.socket = io(serverUrl);
    this.socket.on('connect', () => console.log('socket connected', this.socket.id));
  },
  sendMove: function(data) { this.socket.emit('move', data); },
  onMove: function(handler) { this.socket.on('move', handler); }
};

