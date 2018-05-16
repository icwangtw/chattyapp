const express = require('express');
const SocketServer = require('ws').Server;

const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    // if (client.readyState === server.OPEN) {
      client.send(data);
    // }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log(wss.clients.size)
  ws.on('message', function incoming(data) {
    const inbound = JSON.parse(data)
    if (inbound.username) {
      const outbound = {id :uuidv1(), username:inbound.username, content: inbound.content }
      wss.broadcast(JSON.stringify(outbound))
    } else {
      const outbound = {id :uuidv1(), content: inbound.content }
      wss.broadcast(JSON.stringify(outbound))
    }

  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected', wss.clients.size));
});