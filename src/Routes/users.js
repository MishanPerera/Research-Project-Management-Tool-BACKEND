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

//student -add Topic
router.post('/add-topic', auth, (req, res)=>{
    const leaderId= req.user.id;
    const { description, supervisorId, name } = req.body;

    Topic.findOne({leaderId}).then(group=>{
        if(group) return res.status(400).json({msg : 'You have already created a Topic'});
        
        const newTopic= new Topic({
            leaderId, 
            description,
            supervisorId,
            name
        });

        newTopic.save();

        return res.status(200).json({msg : 'Topic has been created'});
    }).catch(e => console.log(e))
})

//student -fetch topic details
router.get('/topic', auth, (req,res)=>{
	Topic.find({leaderId: req.user.id},(err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Topic Details :'+JSON.stringify(err,undefined,2));
    })
})

//supervisor - retrieve topics

router.get('/topics', auth, (req,res)=>{
	Topic.find({supervisorId: req.user.id},(err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Topic Details :'+JSON.stringify(err,undefined,2));
    })
})

//panel member - get Topics
router.get('/get-topics', auth, (req,res)=>{
	Topic.find((err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Topic Details :'+JSON.stringify(err,undefined,2));
    })
})

//student - fetch group details
router.get('/group', auth, (req,res)=>{
	Group.find({leaderId : req.user.id},(err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Group Details :'+JSON.stringify(err,undefined,2));
    })
})

//supervisor - retrieve groups
router.get('/groups', auth, (req,res)=>{
	Group.find({supervisorId : req.user.id},(err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Group Details :'+JSON.stringify(err,undefined,2));
    })
})

//supervisor -  approval

router.put('/add-approve/:id', auth, (req,res)=>{
    const app = {
        isApprove : req.body.isApprove,
    }
    Topic.findByIdAndUpdate(req.params.id,{$set : app},{new:true},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Updating Group Details :" +JSON.stringify(err,undefined,2));
    });
})

//panel member -  evaluate topics
router.put('/add-evaluate/:id', auth, (req,res)=>{
    const app = {
        isEvaluate : req.body.isApprove,
    }
    Topic.findByIdAndUpdate(req.params.id,{$set : app},{new:true},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Updating Group Details :" +JSON.stringify(err,undefined,2));
    });
})

module.exports = router;