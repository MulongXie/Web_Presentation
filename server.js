var child_process = require('child_process');
var express	=	require("express");
var app	= express();

var uploadPath = './uploads';
var index = 0;

var multer	=	require('multer');
var storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, uploadPath);
    },
    filename: function (req, file, callback) {
        callback(null, index.toString() + '.png');
    }
});
var upload = multer({ storage : storage}).single('userPhoto');


app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.static("processed"));
app.use(express.static("processing"));


app.get('/',function(req,res){
    res.sendfile("public/test2.html");
});

app.post('/upload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            console.log(err);
            res.json({code: 0});
        }else {
            res.json({code:1, imgPath:index.toString() + '.png'});
            index += 1;
        }
    });
});

app.get('/process', function (req, res) {
    var workerProcess = child_process.exec('python processing.py ' + (index-1), function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
            res.json({code:0});
        }else{
            console.log('stdout: ' + stdout);
        }
    });

    workerProcess.on('exit', function () {
        console.log('Program Invoked');
        res.json({code:1, imgPath:'pro' + (index-1).toString() + '.png'});
    });
});

app.listen(8000,function(){
    console.log("Working on port 8000");
});
