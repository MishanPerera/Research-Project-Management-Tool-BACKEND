const mongoose =require('mongoose');

const GroupSchema = new mongoose.Schema({
    leaderId:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    group:{
        type:Array,
        required:true
    },
    supervisor:{
        type:String,
    },
    panelmember:{
        type: String,
    },
    register_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Group = mongoose.model('groups',GroupSchema);