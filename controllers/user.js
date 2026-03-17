const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Gear = require('../models/gear')
const isSignedIn = require("../middleware/isSignedIn");

// My Profile Route
// GET  /users/me
router.get('/me', isSignedIn, async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        const gear = await Gear.find()
        const userGear = await gear.filter(g => g.createdBy === user.username)
        res.render('profile', { user, gear, userGear })
    } catch (error) {
        res.render('err.ejs', { errMessage: error.message })
    }
});

module.exports = router;