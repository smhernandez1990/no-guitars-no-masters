const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Gear = require('../models/gear')

//INDEX - GET - /gear/index.ejs
router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        const gear = await Gear.find()
        res.render('users/gear/index.ejs', { gear: gear })
    } catch (error) {
        
    }
    
})

module.exports = router