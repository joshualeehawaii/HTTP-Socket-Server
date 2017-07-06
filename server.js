//1. Create a socket server to accept TCP connections
//2. The server will listen on port 8080
//3. Transmit 'standard' HTTP Headers to the client
//4. Transmit a hardcoded, in-memory html body for each route
//5. Terminate the connection
//6. If the path is not found in your routes, return a 404 status code and output some text/html content
/*jshint esversion: 6*/

const net = require('net');

//New server (port 8080)
const server = net.createServer((socket) => {
  console.log('client connected');
  socket.write('HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Ubuntu)\nDate: Wed, 08 Jul 2015 22:31:15 GMT\nContent-Type: text/html; charset=utf-8\nContent-Length: 5\nConnection: keep-alive\n\nhello');
  socket.end();
});

//Server listening for connections
server.listen({host:'localhost', port: 8080}, () => {
  console.log('server listening to 8080');
});