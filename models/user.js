const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    uploadedGear: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gear'
}]
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User