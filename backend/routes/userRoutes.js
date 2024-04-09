const express = require('express')
const router = express.Router()

// importing controllers
const { getUser } = require('../controllers/userController')


// using of routes
router.get('/user/:email', getUser)



module.exports = router