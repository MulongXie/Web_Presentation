var express = require('express');
var formidable = require("formidable");
var fs = require('fs');

var app = express();

app.use('/public', express.static('public'));

app.get('/', function(req, res){
    res.sendfile('public/index.html')
});

app.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, files) {
        console.log(files.upload.path);
        fs.writeFileSync("public/test.png", fs.readFileSync(files.upload.path));
        res.redirect("public/upload.html") ;
    });
});

var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});