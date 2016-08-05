var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

var server = app.listen(3000, function () {
    address = server.address();
    ip = address.address === "::" ? "http://localhost" : address.address;

    console.log("Serving at %s:%s", ip, address.port);
    //http://localhost:3000

});
