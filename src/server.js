var http = require("http");
var handler = require("./handler");

var server = http.createServer(handler);

server.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
