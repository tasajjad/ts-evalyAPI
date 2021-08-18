const { Schema, model } = require('mongoose')
// const path = require('path');
// const defaultAvatar = path.join(`${__dirname}/../avatar/avatar.png`)

const avatarSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = Avatar = model('Avatar', avatarSchema)