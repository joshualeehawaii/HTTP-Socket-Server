//1. Create a socket server to accept TCP connections
//2. The server will listen on port 8080
//3. Transmit 'standard' HTTP Headers to the client
//4. Transmit a hardcoded, in-memory html body for each route
//5. Terminate the connection
//6. If the path is not found in your routes, return a 404 status code and output some text/html content

/*jshint esversion: 6*/

const net = require('net');
const fs = require('fs');
const date = new Date().toUTCString();

var showIndex = fs.readFileSync('./index.html');
var show404 = fs.readFileSync('./404.html');
var showHelium = fs.readFileSync('./helium.html');
var showHydrogen = fs.readFileSync('./hydrogen.html');
var showStyles = fs.readFileSync('./styles.css');

//Creating the server
const server = net.createServer((socket) => {

  socket.on('data', (data) => {

    //accsessing the data needed to pass through 'path'
    var path = data.toString().split(' ');

    switch (path[1]) { //path[1] = '/', '/index.html', etc...

    case '/':
      displayIndex(socket);
      break;

    case '/index.html':
      displayIndex(socket);
      break;

    case '/hydrogen.html':
      displayHydrogen(socket);
      break;

    case '/helium.html':
      displayHelium(socket);
      break;

    case '/404.html':
      display404(socket);
      break;

    case '/css/styles.css':
      displayStyles(socket);
      break;

    default :
      display404(socket);
      break;
    }
  });
});

//Server listening for connections
server.listen({host:'localhost', port: 8080}, () => {
  console.log('server listening to 8080');
});

//functions to deal with requests:
const displayIndex = (socket) => {
  socket.write(`HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Ubuntu)\nDate: ${date}\nContent-Type: text/html; charset=utf-8\nContent-Length: ${showIndex.length}\nConnection: keep-alive\n\n${showIndex}`);
  socket.end();
};

const displayHydrogen = (socket) => {
  socket.write(`HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Ubuntu)\nDate: ${date}\nContent-Type: text/html; charset=utf-8\nContent-Length: ${showHydrogen.length}\nConnection: keep-alive\n\n${showHydrogen}`);
  socket.end();
};

const displayHelium = (socket) => {
  socket.write(`HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Ubuntu)\nDate: ${date}\nContent-Type: text/html; charset=utf-8\nContent-Length: ${showHelium.length}\nConnection: keep-alive\n\n${showHelium}`);
  socket.end();
};

const display404 = (socket) => {
  socket.write(`HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Ubuntu)\nDate: ${date}\nContent-Type: text/html; charset=utf-8\nContent-Length: ${show404.length}\nConnection: keep-alive\n\n${show404}`);
  socket.end();
};

const displayStyles = (socket) => {
  socket.write(`HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Ubuntu)\nDate: ${date}\nContent-Type: text/CSS; charset=utf-8\nContent-Length: ${showStyles.length}\nConnection: keep-alive\n\n${showStyles}`);
  socket.end();
};