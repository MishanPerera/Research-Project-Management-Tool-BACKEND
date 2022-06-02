const router = require('express').Router()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
let path = require('path');
let PanelMember = require("../Models/PanelMember")

const storage = multer.diskStorage({
    destination:function(req,file, cb){
        cb(null, 'images');
    },

    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.route('/add').post(upload.single('photo'), (req, res) => {
    const panelMemberID = req.body.panelMemberID;
    const photo = req.file.filename;
    const fullName = req.body.fullName;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const gender= req.body.gender;
    const dob= req.body.dob;
    const contactNumber= req.body.contactNumber;
    const department= req.body.department;
    const faculty= req.body.faculty;

    const newPanelMember = new PanelMember({
        panelMemberID,
        photo,
        fullName,
        email,
        username,
        password,
        gender,
        dob,
        contactNumber,
        department,
        faculty
    })

    newPanelMember.save().then(() =>{ 
        res.json('Your are registered as a Panel Memebr')
    }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports= router;


