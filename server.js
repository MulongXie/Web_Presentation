var express	=	require("express");
var app	= express();

var uploadPath = './uploads';

var multer	=	require('multer');
var storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, uploadPath);
    },
    filename: function (req, file, callback) {
        uploadPath = file.fieldname + '-' + Date.now();
        callback(null, uploadPath);
    }
});
var upload = multer({ storage : storage}).single('userPhoto');


app.use(express.static("public"));
app.use(express.static("uploads"));


app.get('/',function(req,res){
    res.sendfile("public/test2.html");
});

app.post('/upload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            res.json({code: 0});
        }else {
            res.json({code:1, imgPath:uploadPath});
        }
    });
});

app.listen(8000,function(){
    console.log("Working on port 8000");
});
