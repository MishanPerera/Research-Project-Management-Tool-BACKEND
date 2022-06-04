const express = require('express');
const fs = require('fs');
const grid = require('gridfs-stream');
const mongoose = require('mongoose');
const GridFSBucket = require("mongodb").GridFSBucket;
const cors = require('cors');
require('dotenv').config()

const app = express();

const connectDB = require('./src/Config/DB');
const SignUpURL = require('./src/Route/SignUp');
const SignInURL = require('./src/Route/SignIn');
const supervisorRouter=require ('./src/Route/superviosrRoute')
// const AppointmentURLs = require('./src/Route/appointment')

const PORT = process.env.PORT || 4000;

let gfs;
connectDB();

const conn = mongoose.connection;
conn.once("open", function(){
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection("uploads")
})


app.get('/files', async (req,res)=>{
    gfs.files.find().toArray((err,files)=>{
        if(!files || files.length === 0){
            return res.status(400).json({msg: "No Files Exists"})
        }

        return res.json(files)
    });
    
})

app.get('/file/:filename', async(req,res)=>{
    try {
        const bucket = new GridFSBucket(conn.db, {
        bucketName: "uploads",
    });
    let downloadStream = bucket.openDownloadStreamByName(req.params.filename);
    // downloadStream.pipe(fs.createWriteStream('./outputFile'));

    downloadStream.on("data", function (data) {
        return res.status(200).write(data);
    });
    downloadStream.on("error", function (err) {
        return res.status(404).send({ message: "Cannot download the File!" });
    });
    downloadStream.on("end", () => {
        return res.end();
    });
    } catch (error) {
        return res.status(500).send({
        message: error.message,
        });
    }
    
})

app.delete('/file/:filename', async(req,res)=>{
    try {
        await gfs.files.deleteOne({filename: req.params.filename})
        res.send("Deleted Successfully")
    } catch (error) {
        res.send('Error Ocuured')
    }
})

app.use(express.json());
app.use(cors());

app.use('/',SignInURL);
app.use('/',SignUpURL);
app.use('/supervisor', supervisorRouter);



app.listen(PORT, (err)=>{
    if(err) console.log("Error ocuured in starting the server:",err)
    console.log(`Server is up and running on port ${PORT}`);
})
