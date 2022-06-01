const mongoose = require('mongoose')
const Schema = mongoose.Schema

const panelSchema = new Schema({
    panelMemberID:{
        type: String,
        required:true
    },

    fullName:{
        type: String,
        required:true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    username:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true
    },

    gender:{
        type: String,
        required: true
    },

    dob:{
        type: String,
        required: true
    },

    contactNumber: {
        type: Number,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    faculty: {
        type: String,
        required: true
    },  

})

const Panel = mongoose.model("PanelMember",panelSchema);
module.exports = Panel;