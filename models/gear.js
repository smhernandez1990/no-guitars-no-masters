const mongoose = require('mongoose')

const gearSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgId: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    format: {
        type: String,
        enum: ['pedal', 'modular', 'pro audio', 'cassette player/4 track', 'diy', 'other'],
        required: true
    },
    effects: [ String ],
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User._id'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User.username'
    }
}, {
    timestamps: true
})

const Gear = mongoose.model('Gear', gearSchema)

module.exports = Gear