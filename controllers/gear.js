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
        res.render('err.ejs', { errMessage: error.message })   
    }
})

//NEW - GET - users/:userId/gear/new
router.get('/new', (req, res) => {
    res.render('gear/new.ejs')
})

//DELETE - DELETE - /gear/:gearId
router.delete('/:gearId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id) //{ $pull: { uploadedGear: req.params.gearId } })
        const gear = await Gear.findById(req.params.gearId)
        if (user.username === gear.createdBy) {
            await User.updateOne({ $pull: { uploadedGear: gear } })
            await Gear.deleteOne(gear)
        } else {
            throw new Error('You must be signed in to add, edit or delete gear')
        }
        res.redirect('/gear')
    } catch (error) {
        res.render('err.ejs', { errMessage: error.message }) 
    }
})

//UPDATE - PUT - /gear/:gearId
router.put('/:gearId', upload.single('img'), async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id) //{ $pull: { uploadedGear: req.params.gearId } })
        const gear = await Gear.findById(req.params.gearId)
        if (user.username === gear.createdBy) {
            const { name, company, format, effects, description } = req.body
            const userId = await user._id
            const createdBy = await user.username
            const updateGear = await Gear.updateOne(gear, {
                name,
                company,
                format,
                effects,
                description,
                userId,
                createdBy
            }, { new: true })
        } else {
            throw new Error('You must be signed in to add, edit or delete gear')
        }
        
        res.redirect(`/gear/${req.params.gearId}`)
    } catch (error) {
        res.render('err.ejs', { errMessage: error.message }) 
    }
})

//CREATE - POST - /gear
router.post('/', upload.single('img'), async (req, res) => {
    try {
        if (user) {
        const { name, company, format, effects, description } = req.body
        const user = await User.findById(req.session.user._id)
        const userId = await user._id
        const createdBy = await user.username
        const result = await cloudinary.uploader.upload(req.file.path, (err, result) => {
            if (err) {
                res.json({ errMessage: error.message })
            } if (result) {
                console.log('img uploaded');
            }
        })
        const img = await result.secure_url
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
        user.uploadedGear.push(newGear._id)
        await user.save()
        res.redirect(`/gear/${newGear._id}`)
        } else {
            throw new Error('You must be signed in to add, edit or delete gear')
        }
    } catch (error) {
        res.render('err.ejs', { errMessage: error.message }) 
    }
})

//EDIT - GET - /gear/:gearId
router.get('/:gearId/edit', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id) //{ $pull: { uploadedGear: req.params.gearId } })
        const gear = await Gear.findById(req.params.gearId)
        if (user.username === gear.createdBy) {
            res.render('gear/edit.ejs', { gear })
        } else {
            throw new Error('You must be signed in to add, edit or delete gear')
        }
    } catch (error) {
        res.render('err.ejs', { errMessage: error.message }) 
    }
})

//SHOW - GET - /gear/:gearId
router.get('/:gearId', async (req, res) => {
    try {
        const gear = await Gear.findById(req.params.gearId)
        res.render('gear/show.ejs', { gear })
    } catch (error) {
        res.render('err.ejs', { errMessage: error.message }) 
    }
})

module.exports = router