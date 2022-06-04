const express =require('express');
const router= express.Router();
const auth = require('../MiddleWare/auth');
const Group = require('../Models/Group');
const User = require('../Models/User');
const Topic = require('../Models/Topic');
const Message = require('../Models/Message');


//student -add group

router.post('/add-group', auth, (req, res)=>{
    const leaderId= req.user.id;
    const { supervisorId, name , description, members} = req.body;

    Group.findOne({leaderId}).then(group=>{
        if(group) return res.status(400).json({msg : 'You have already created a Group'});
        
        const newGroup= new Group({
            leaderId, 
            supervisorId,
            name, 
            description, 
            members
        });
        newGroup.members = members.replace('[','').replace(']','').split(',');
        newGroup.save()

        return res.status(200).json({msg : 'Group has been created'});
    }).catch(e => console.log(e))
})


module.exports = router;