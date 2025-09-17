var http = require('http');
var fs = require('fs');
var EventEmitter = require("events");

var myEvent = new EventEmitter();


myEvent.on("page", (name) => {
    console.log("Page viewed: " + name);
});

var server = http.createServer((req, res) => {
    var pageName = req.url === "/" ? "home" : req.url.slice(1);
    var fileName = pageName + ".html";

    fs.readFile(fileName, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);

        
        myEvent.emit("page", pageName);
    });
});

server.listen(8080, () => {
    console.log("Server listening on port 8080");
});
