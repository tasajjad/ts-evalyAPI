const { Schema, model } = require('mongoose')
const Joi = require('joi')

const emailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    primaryEmail: {
        type: String,
        default: ''
    },
    otherEmail: {
        type: String,
        default: ''
    }
})

const emailValidation = function (obj) {
    const schema = Joi.object({
        primaryEmail: Joi.string().email(),
        otherEmail: Joi.string().email()
    })

    return schema.validate(obj)
}

const Email = model("Email", emailSchema)

module.exports = {
    Email: Email,
    emailValidation: emailValidation,
}