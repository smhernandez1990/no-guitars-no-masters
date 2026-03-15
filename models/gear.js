const mongoose = require('mongoose')

const gearSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
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
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Gear = mongoose.model('Gear', gearSchema)

module.exports = Gear