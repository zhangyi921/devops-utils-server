import express from 'express'
// const http = require('http');
import http from 'http';  // Uncomment if using ES modules
// const { WebSocketServer } = require('ws');
import { WebSocketServer } from 'ws';  // Uncomment if using ES modules
// const pty = require('node-pty');
import pty from 'node-pty';
import { env } from 'process';

const app = express();
app.use(express.static('dist'))

// (Optional) serve a simple index route or static files if needed.
// In this setup, the Next.js frontend runs separately, so no static serving here.

app.get('/reqData', (req, res) => {
    res.json({
        headers: req.headers,
        env
    });
  })
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });  // Attach WebSocket to the HTTP server

// Handle new WebSocket connections
wss.on('connection', (ws) => {
//   console.log('New WebSocket connection');

  // Spawn a new shell process for this connection
  const shell = process.env.SHELL || '/bin/bash';
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',  // terminal type for color support
    cols: 150,
    rows: 47,
    cwd: process.env.HOME,      // start in home directory
    env: process.env            // inherit env (PATH, etc.)
  });
  // (The above spawns a bash shell in a pseudoterminal)&#8203;:contentReference[oaicite:4]{index=4}

  // Forward PTY output to the WebSocket
  ptyProcess.on('data', data => {
    try {
      ws.send(data);  // send text/binary output to client
    } catch (error) {
      // If the WebSocket is not open, ignore or log error
    }
  });

  // Forward WebSocket data to the PTY (user input)
  ws.on('message', msg => {
    ptyProcess.write(msg);  // write raw data to shell's stdin
  });

  // Handle WebSocket closure
  ws.on('close', () => {
    // console.log('WebSocket disconnected');
    ptyProcess.kill();      // terminate the shell process
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});