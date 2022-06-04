const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const keys = require('../config/key')

const Supervisor = require('../Models/Supervisor')
const Message = require('../Models/Message')
//TODO: import student model

//Utils
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')
const sendEmail = require('../utils/nodemailer')

const validateSupervisorRegisterInput = require('../validation/supervisorRegistration')
const validateSupervisorLoginInput = require('../validation/supervisorLogin')
const validateSupervisorUpdatePassword = require('../validation/supervisorUpdatePassword')
const validateUpdateForgotPassword = require('../validation/forgotPassword')
const validateOTP = require('../validation/validateOTP')



module.exports = {
    registerSupervisor: async (req, res, next) => {
        try {
            const { errors, isValid } = validateSupervisorRegisterInput(req.body);

            if (!isValid) {
                return res.status(400).json(errors)
            }
            const { 
                    supervisorID,
                    name, 
                    email, 
                    password,
                    gender,    
                    department, 
                    faculty, 
                    dob, 
                    mobileNumber,
                    
                } = req.body

            const supervisor = await Supervisor.findOne({ email })
            if (supervisor) {
                errors.email = "Email already exist"
                return res.status(400).json(errors)
            }
            const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

           
            let hashedPassword;
            hashedPassword = await bcrypt.hash(password, 10)

            
            const newSupervisor = await new Supervisor({
                supervisorID,
                name,
                email,
                avatar,
                password: hashedPassword,
                gender,
                department,
                faculty,
                dob,
                mobileNumber
            })
            await newSupervisor.save()

            res.status(200).json({ result: newSupervisor })
        }
        catch (err) {
            res.status(400).json({ message: `error in registering new supervisor !", ${err.message}` })
        }

    },



    supervisorLogin: async (req, res, next) => {
        try {
            const { errors, isValid } = validateSupervisorLoginInput(req.body);

            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { supervisorID, password } = req.body;

            const supervisor = await Supervisor.findOne({ supervisorID })
            if (!supervisor) {
                errors.supervisorID = 'Are you sure you registered ? Check the ID again !';
                return res.status(404).json(errors);
            }
            const isCorrect = await bcrypt.compare(password, supervisor.password)
            if (!isCorrect) {
                errors.password = 'Invalid Credentials';
                return res.status(404).json(errors);
            }
            const payload = {
                id: supervisor.id, 
                name: supervisor.name, 
                email: supervisor.email,
                mobileNumber: supervisor.mobileNumber, 
                avatar: supervisor.avatar,
                supervisorID: supervisor.supervisorID,
                faculty: supervisor.faculty,
                department: supervisor.department
            };
            jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 7200 },
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
            );
        }
        catch (err) {
            console.log("Error in supervisor login", err.message)
        }

    },


    
}