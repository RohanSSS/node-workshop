var fs = require("fs");
var querystring = require("querystring");

var message = "I am so happy - on it like a car bonnet";

var extensionType = {
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  jpg: "image/jpeg",
  png: "image/png"
};

function handler(request, response) {
  var method = request.method;
  console.log(method);
  var endpoint = request.url;
  console.log(endpoint);

  if (method === "GET") {
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
    } else {
      var extension = endpoint.split(".")[1];
      fs.readFile(__dirname + "/../public" + endpoint, function(error, file) {
        if (error) {
          console.log("this is the else");
          console.log(error);
          return;
        }
        response.writeHead(200, { "Content-Type": extensionType[extension] });
        response.end(file);
      });
    }
  } else if (method === "POST") {
    var allTheData = "";
    request.on("data", function(chunkOfData) {
      allTheData += chunkOfData;
    });

    request.on("end", function() {
      var convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.writeHead(302, { Location: "/" });
      response.end();
    });
  }
}

module.exports = handler;
