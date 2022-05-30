const crypto = require('crypto')
const multer = require("multer");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");

let storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017/devx',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match =["application/vnd.openxmlformats-officedocument.presentationml.presentation","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/pdf"]
        
        return new Promise((resolve, reject)=>{
            crypto.randomBytes(16, (err, buf)=>{
                if(match.indexOf(file.mimetype) === -1){
                    return reject();
                }
                if(err){
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    description: req.body.description,
                    bucketName: 'uploads'
                }
                resolve(fileInfo);
            })
        })
    }
});

module.exports = multer({ storage });