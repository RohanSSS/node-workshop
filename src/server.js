var http = require("http");
var fs = require("fs");

var message = "I am so happy - on it like a car bonnet";

function handler(request, response) {
  var method = request.method;
  console.log(method);
  var endpoint = request.url;
  console.log(endpoint);
  if (endpoint === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile(__dirname + "/../public/index.html", function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else if (endpoint === "/node") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("Bob's your node");
    response.end();
  } else if (endpoint === "/girls") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("Bob's your girls");
    response.end();
  }
}

var server = http.createServer(handler);

server.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
