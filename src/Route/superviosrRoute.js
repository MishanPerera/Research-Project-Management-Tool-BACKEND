const express = require('express')
const passport = require('passport')
const router = express.Router()
const upload = require('../utils/multer')

const {registerSupervisor, supervisorLogin, updatePassword, forgotPassword, postOTP} = require ('../controller/supervisorController')



router.post('/supervisorRegister' , registerSupervisor)


router.post('/login', supervisorLogin)


router.post('/forgotPassword', forgotPassword)

router.post('/postOTP', postOTP)

//UPDATE PASSWORD
router.post('/updatePassword', passport.authenticate('jwt', { session: false }), updatePassword)    

module.exports = router