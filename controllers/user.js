const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Gear = require('../models/gear')
const isSignedIn = require("../middleware/isSignedIn");

// My Profile Route
// GET  /users/me
router.get('/me', isSignedIn, async (req, res) => {
    const user = await User.findById(req.session.user._id);
    res.render('profile', { user });
});

module.exports = router;