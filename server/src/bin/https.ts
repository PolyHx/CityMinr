
import { Server } from "../app";
import * as https from "https";
import * as fs from "fs";
var debug = require('debug');

var app = new Server().app;

var port = normalizePort(process.env.PORT || '8087');
app.set('port', port);

var option = {
	ca: fs.readFileSync('/home/julien/hackatown_io.ca-bundle'),
  key: fs.readFileSync('/home/julien/hackatown_io.key'),
  cert: fs.readFileSync('/home/julien/hackatown_io.crt')
};

var server = https.createServer(option, app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
