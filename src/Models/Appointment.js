const mongoose =require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    prescription:{
        type:String,
        required:true
    },
    treatment:{
        type:String,
        required:true
    },
    feed:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    doctor:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    isConsulted:{
        type:Boolean,
        required:true
    },
    register_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Appointment = mongoose.model('appointments',AppointmentSchema);