//1. Create a client to establish TCP socket connections to HTTP servers
//2. The node command requires a single argument, the host and uri to request a resource from
//example: www.devleague.com/apply
//4. Transmit 'standard' HTTP Headers to the server
//5. Wait for a response from the server
//6. When the server responds, display the response message body to the terminal
//7. If the node client is run with no arguments, display a "help/usage" message that explains how to use your client, including all available options
/*jshint esversion: 6*/

const net = require('net');

//'GET / HTTP/1.1\r\nHost: www.google.com\r\nConnection: close\r\n\r\n'

const port = 80;
const destination = process.argv[2];
var host = destination;
console.log('this is the argv',process.argv); //array


const client = net.createConnection({port: port, host: destination}, () => { //build path to URI
  console.log('connected');
});

client.write(`GET /${host} HTTP/1.1\r\nHost: ${destination}\r\nConnection: close\r\n\r\n`);


client.on('data', (data) => {
  process.stdout.write(data);
});


//fing the first slash, and anying after is a URI

if (destination.indexOf('/') > -1) {
  host = destination.slice(0, destination.indexOf('/'));
} else {
  host = destination;
}

// const net = require('net')

// const target = process.argv[2]

// let host = target.indexOf('/') > -1 ? target.slice(0, target.indexOf('/')) : target
// let uri = target.indexOf('/') > -1 ? target.slice(target.indexOf('/')) : '/'

// let request = net.createConnection(80, host)

// request.setEncoding('utf8')

// request.on('connect', function(){
//   process.stdout.write('connectd')
//   request.write(`GET ${uri} HTTP/1.1\nHost: ${host}\nConnection: Close\n\n`);
// })

// request.on('data', function(data) {
//   process.stdout.write(data.toString())
// })

// request.on('end', function(){
//   process.stdout.write('\n\nconnection terminated')
// })
