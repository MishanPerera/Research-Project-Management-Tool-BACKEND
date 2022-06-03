const express = require('express');
const grid = require('gridfs-stream');
const fs = require('fs')
const mongoose = require('mongoose');
const GridFSBucket = require("mongodb").GridFSBucket;
const cors = require('cors');
const auth = require('./src/MiddleWare/auth')

require('dotenv').config()

const app = express();

const connectDB = require('./src/Config/DB');
const SignUpURL = require('./src/Routes/SignUp');
const SignInURL = require('./src/Routes/SignIn');
const panelMemberRouter = require('./src/Routes/panelmembers');
// const AppointmentURLs = require('./src/Route/appointment')

const PORT = process.env.PORT || 4000;
const AdminURL = require('./src/Routes/panelmembers');

let gfs;
connectDB();

const conn = mongoose.connection;
conn.once("open", () => {
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection("uploads")
})

app.use(express.json());
app.use(cors());

app.use('/',SignInURL);
app.use('/',SignUpURL);
app.use('/panel', panelMemberRouter);
app.use('/',AdminURL);

// Get All Files
app.get('/files', async (req,res)=>{
    console.log(req.user)
    gfs.files.find().toArray((err,files)=>{
        if(err) return res.status(400).json({msg: `Error: ${err}`})
        if(!files || files.length === 0){
            return res.status(400).json({msg: "No Files Exists"})
        }
        return res.json(files)
    });
})

// Download Selected File
app.get('/file/:filename', (req,res)=>{
    try {
        const bucket = new GridFSBucket(conn.db, {
        bucketName: "uploads",
    });
    let downloadStream = bucket.openDownloadStreamByName(req.params.filename);
    downloadStream.pipe(fs.createWriteStream(`../Download/${req.params.filename.split('+')[1]}`));

    downloadStream.on("data", (data) => {
        return res.status(200).write(data);
    });
    downloadStream.on("error", (err) => {
        return res.status(404).send({ msg : "Cannot download the File!" , err: err});
    });
    downloadStream.on("end", () => {
        return res.end();
    });
    } catch (error) {
        return res.status(500).send({ msg: error.message});
    }
    
})

// Delete Selected File
app.delete('/file/:filename', async(req,res) => {
    try {
        await gfs.files.deleteOne({filename: req.params.filename})
        res.status(200).json({msg :`${req.params.filename.split('+')[1]} file deleted successfully`})
    } catch (error) {
        res.status(400).json({msg : `Error: ${error}`})
    }
})



app.listen(PORT,(err)=>{
    if(err) console.log("Error ocuured in starting the server:",err)
    console.log(`Server is up and running on port ${PORT}`)
})

// Download Selected File
app.get('/file/:filename', (req,res)=>{
    try {
        const bucket = new GridFSBucket(conn.db, {
        bucketName: "uploads",
    });
    let downloadStream = bucket.openDownloadStreamByName(req.params.filename);
    downloadStream.pipe(fs.createWriteStream(`../Download/${req.params.filename.split('+')[1]}`));

    downloadStream.on("data", (data) => {
        return res.status(200).write(data);
    });
    downloadStream.on("error", (err) => {
        return res.status(404).send({ msg : "Cannot download the File!" , err: err});
    });
    downloadStream.on("end", () => {
        return res.end();
    });
    } catch (error) {
        return res.status(500).send({ msg: error.message});
    }
    
})

// Delete Selected File
app.delete('/file/:filename', async(req,res) => {
    try {
        await gfs.files.deleteOne({filename: req.params.filename})
        res.status(200).json({msg :`${req.params.filename.split('+')[1]} file deleted successfully`})
    } catch (error) {
        res.status(400).json({msg : `Error: ${error}`})
    }
})

app.listen(PORT,(err)=>{
    if(err) console.log("Error ocuured in starting the server:",err)
    console.log(`Server is up and running on port ${PORT}`)
})