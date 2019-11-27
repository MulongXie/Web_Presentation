var express	=	require("express");
var multer	=	require('multer');
var storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({ storage : storage}).single('userPhoto');


var app	= express();

app.use(express.static("public"));
app.use(express.static("uploads"));


app.get('/',function(req,res){
    res.sendfile("public/test2.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(8000,function(){
    console.log("Working on port 8000");
});
