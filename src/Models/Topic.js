const mongoose =require('mongoose');

const TopicSchema = new mongoose.Schema({
    GroupId:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isApprove:{
        type: Boolean,
        default: false
    },
    isEvaluate:{
        type: Boolean,
        default: false
    },
    upload_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Topic = mongoose.model('topics',TopicSchema);