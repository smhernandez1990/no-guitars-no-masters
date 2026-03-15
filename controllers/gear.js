const express = require('express')
const router = express.Router()
const Gear = require('../models/gear')
const User = require('../models/user')
const cloudinary = require('../utils/cloudinary')
const upload = require('../middleware/multer')

//INDEX - GET - /gear/index.ejs
router.get('/', async (req, res) => {
    try {
       const gear = await Gear.find()
       res.render('gear/index.ejs', { gear: gear })
    } catch (error) {
        res.status(500).json({ errMessage: error.message })   
    }
})

//NEW - GET - users/:userId/gear/new
router.get('/new', (req, res) => {
    res.render('gear/new.ejs')
})

//CREATE - POST - /gear
router.post('/', upload.single('img'), async (req, res) => {
    try {
        const { name, company, format, effects, description } = req.body
        const user = await User.findById(req.session.user._id)
        const userId = await User.findById(req.session.user._id)
        const createdBy = await User.findById(req.session.user._id)
        const result = await cloudinary.uploader.upload(req.file.path, (err, result) => {
            if (err) {
                res.json({ errMessage: error.message })
            } if (result) {
                console.log('img uploaded');
            }
        })
        const img = await result.secure_url
        //const effect = await checkedEffect
        const newGear = await Gear.create({
            name,
            img,
            company,
            format,
            effects,
            description,
            userId,
            createdBy
        })
        user.uploadedGear.push(newGear)
        await user.save()
        res.status(200).json({success: true})
    } catch (error) {
        res.status(500).json({ errMessage: error.message })
    }
})

module.exports = router