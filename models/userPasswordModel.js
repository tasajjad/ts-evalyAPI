const { Schema, model } = require('mongoose');

const passwordSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    password: {
        type: String,
        require: true,
    }
})

module.exports = Password = model('Password', passwordSchema)