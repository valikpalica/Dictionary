const express = require('express')
const serveIndex = require('serve-index');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const app  = express();



const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./public/ftp");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});




app.use(express.static(path.join(__dirname,'public')));

app.use('/ftp',express.static('public/ftp'),serveIndex('public/ftp',{'icons':true}));

app.use(bodyParser.urlencoded({extended:false}));

app.use(multer({storage:storageConfig}).single('uploaded_file'));



app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.post('/save',  function (req, res) {
    console.log(req.file)
    res.redirect('/ftp');
 });

app.listen(3000,()=>{
    console.log(`ftp-server started on port  3000`);
});