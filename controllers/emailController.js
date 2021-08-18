const { Email, emailValidation } = require('../models/userEmailModel')

module.exports.addEmail = async (req, res) => {
    const { id } = req.params;
    const { primaryEmail, otherEmail } = req.body
    try {
        const emailAlready = await Email.findOne({ user: id })
        console.log(emailAlready)
        if (emailAlready) {
            const { _id } = emailAlready;

            const updateEmail = await Email.findByIdAndUpdate(_id, { primaryEmail, otherEmail }, { new: true })
            if (updateEmail) {
                res.status(200).send({ message: "Update Succesfull", payload: updateEmail })
            } else {
                res.status(500).send({ message: "Something Went Wrong !" })
            }
        } else {
            const newEmail = new Email({ user: id, primaryEmail, otherEmail })
            if (newEmail) {
                res.status(200).send({ message: "Email Add Succesfull", payload: newEmail })

            } else {
                res.status(500).send({ message: "Something Went Wrong !" })
            }
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

module.getEmailByUserId = async (req, res) => {

}