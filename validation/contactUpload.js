const multer = require('multer');
const path = require('path');


const file = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,path.join(__dirname,'../temp'))
    },
    filename:(req, file ,cb) => {
        cb(null,file.originalname);
    }
});

const upload = multer({storage:file});


exports.csvUpload = upload.single('test')
