const { Schema, model } = require('mongoose')
const path = require('path');
const defaultAvatar = path.join(`${__dirname}/../avatar/avatar.png`)

const userSchema = new Schema({
    phone: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    password: {
        type: Schema.Types.ObjectId,
        ref: "Password"
    },
    avatar: {
        type: String,
        default: defaultAvatar
    }

}, { timestamps: true })


module.exports = User = model('User', userSchema)