const express = require('express')
const passport = require('passport')
const router = express.Router()
const upload = require('../utils/multer')

const {registerSupervisor, supervisorLogin} = require ('../controller/supervisorController')



router.post('/supervisorRegister' , registerSupervisor)


router.post('/login', supervisorLogin)

module.exports = router