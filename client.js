//1. Create a client to establish TCP socket connections to HTTP servers
//2. The node command requires a single argument, the host and uri to request a resource from
//example: www.devleague.com/apply
//4. Transmit 'standard' HTTP Headers to the server
//5. Wait for a response from the server
//6. When the server responds, display the response message body to the terminal
//7. If the node client is run with no arguments, display a "help/usage" message that explains how to use your client, including all available options
/*jshint esversion: 6*/

const net = require('net');
console.log(process.argv); //array
//'GET / HTTP/1.1\r\nHost: www.google.com\r\nConnection: close\r\n\r\n'

const port = 80;
const destination = process.argv[2];

const client = net.createConnection({port: port, host: destination}, () => {
  console.log('connected');
});

client.write(`GET / HTTP/1.1\r\nHost: ${destination}\r\nConnection: close\r\n\r\n`);

client.on('data', (data) => {
  process.stdout.write(data);
});