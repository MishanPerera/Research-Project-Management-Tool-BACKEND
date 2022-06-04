const mongoose = require('mongoose')
const { Schema } = mongoose

const supervisorSchema = new Schema({

    supervisorID: {
            type: String,
            required:true
    },
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
   
    gender: {
        type: String
    },
    department: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
   
    dob: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number
    },
    otp: {
       type:String
    }
})

module.exports = mongoose.model('supervisor',supervisorSchema)



