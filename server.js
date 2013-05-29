var http = require('http');
var shoe = require('shoe');
var ecstatic = require('ecstatic')(__dirname + '/static');
var spawn = require('child_process').spawn;
var bash = spawn('bash');

bash.stdin.setEncoding('utf-8');
bash.stdout.setEncoding('utf-8');
bash.stderr.setEncoding('utf-8');

var server = http.createServer(ecstatic);
server.listen(9999);
console.log('browserbash listening on port 9999');

var sock = shoe(function (stream) {
  stream.pipe(bash.stdin);
  bash.stdout.pipe(stream);
  bash.stderr.pipe(stream);
});
sock.install(server, '/bash');