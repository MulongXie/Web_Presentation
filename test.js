const express=require("express");
const multer=require("multer");
var app=express();

var upload = multer({dest:'uploads/'});

app.use(express.static("public"));
app.use(express.static("uploads"));

app.get('/', function(req, res){
    res.sendfile('public/test.html');
});

app.post('/upload', upload.single('uploadImg'), function (req, res) {

    // 输出文件信息
    console.log('====================================================');
    console.log(req.file);
    console.log('fieldname: ' + req.file.fieldname);
    console.log('originalname: ' + req.file.originalname);
    console.log('encoding: ' + req.file.encoding);
    console.log('mimetype: ' + req.file.mimetype);
    console.log('size: ' + (req.file.size / 1024).toFixed(2) + 'KB');
    console.log('destination: ' + req.file.destination);
    console.log('filename: ' + req.file.filename);
    console.log('path: ' + req.file.path);

    // 重命名文件
    let oldPath = path.join(__dirname, req.file.path);
    let newPath = path.join(__dirname, 'uploads/' + req.file.originalname);
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            res.json({
                code : 0,
                data : {
                    orgImgPath:newPath
                }
            });
            console.log(err);
        } else {
            res.json({
                code : 1,
                data : {
                    orgImgPath:newPath
                }
            });
        }
    });

    res.end();
});

var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});