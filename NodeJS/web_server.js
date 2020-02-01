var express = require("express");

var app = express();
app.get("/", function(req, res){
    res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write("<html><body><p>This is home page</p></body></html>");
        res.end();
});

app.get("/student/:id", function(req, res){
    res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write("<html><body><p>This is student page </p></body></html>");
        res.send(req.param.id);
        res.end();
});

app.get("/admin", function(req, res){
    res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write("<html><body><p>This is admin page</p></body></html>");
        res.end();
});
app.listen(3000);