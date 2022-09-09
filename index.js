const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const WebSocket = require("ws");

const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client !== ws) {
        client.send(message, { binary: false });
      }
    });
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
