const express =require('express');
const upload = require("../MiddleWare/upload");
const { isValidObjectId } = require('mongoose');
const router= express.Router();
const bcrypt =require('bcrypt')
const User = require('../Models/User');

// Upload File
router.post('/upload',upload.single('file'),(req, res)=>{
    if(req.file === undefined){
        return res.send('Select a file to Continue');
    }
    return res.send({
        message: "File has been uploaded.",
    });
})
// Delete User Details
router.delete('/delete-user/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No User Details with given id : ${req.params.id}`);
    
    User.findByIdAndDelete(req.params.id,(err,doc)=>{
        if(!err) res.send(doc);
        else console.log("Error in Deleting User Details :" +JSON.stringify(err,undefined,2));
    })
})
// Get User Details
router.get('/user',(req,res)=>{
	User.find((err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving User Details :'+JSON.stringify(err,undefined,2));
    })
})
// User Sign Up
router.post('/sign-up',async (req,res)=>{

    const username= req.body.username;
    const email= req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password,saltPassword);

    await User.findOne({email})
    .then((user) =>{
        if(user) return res.status(400).json({ msg : 'User already exists'});
        const newUser = new User({
            username,
            password,
            email,
            role,
        });

    newUser.password=securePassword;
    
    newUser.save().then((user)=>{
        res.json({
            token:true,
            id:user.id,
            name:user.username,
            email:user.email
            })
        }).catch(e => console.log(e));
    }).catch(e => console.log(e))
})

module.exports = router;