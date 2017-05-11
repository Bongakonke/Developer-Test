var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require("./app/routes/api")(router);
var path = require("path");

app.use(morgan("dev"));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/api", appRoutes);

mongoose.connect("mongodb://devuser:D3vuS3r@ds060009.mlab.com:60009/developer-test-database", function (err) {
    if (err) {
        console.log("DB Not Connected");
    } else {
        console.log("DB Connected");
    }
    
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/app/views/index.html"));
});


app.listen(port, function () {
    console.log("Running server on port: " + port);
});