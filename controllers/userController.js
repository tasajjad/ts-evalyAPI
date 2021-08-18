// Dependencies
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Internal
const User = require('../models/userModel')
const Avatar = require('../models/userAvatar')
const Password = require('../models/userPasswordModel')

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @signup function can also expect all filled if not provide all field 
 * so this appllication will be crush
 * @userId Must be required in password if not provide  a password database created also password 
 */

module.exports.signUp = async (req, res) => {
    const { phone, firstName, lastName, gender, dob } = req.body;
    const userExists = await User.findOne({ phone })
    try {
        if (userExists) {
            res.status(301).send({ message: 'User has been already exist !' })
        } else {
            const createUser = new User({ phone, firstName, lastName, gender, dob })
            const userSaved = await createUser.save();
            if (userSaved) {
                res.status(200).send({ message: 'Account Created successfully', payload: createUser })
            } else {
                res.status(500).send({ message: 'Something went wrong !' })
            }
        }
    } catch (err) {
        res.status(500).send({ message: 'Internal Database Problem occured' })
    }

}

module.exports.createPassWord = async (req, res) => {
    const { password, user } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        if (hashedPassword) {
            const createPassWord = new Password({ password: hashedPassword, user });
            const savedPassword = await createPassWord.save()
            if (savedPassword) {
                const passwordID = savedPassword._id;
                const update = await User.findByIdAndUpdate(user, { password: passwordID }, { new: true })
                if (update) {
                    res.status(200).send({
                        message: 'Account Created Succesfull',
                        payload: update
                    })
                } else {
                    res.status(500).send({ message: 'User cannot find ! Not Found User' })
                }

            } else {
                res.status(500).send({ message: 'Something went wrong !' })
            }
        }

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

module.exports.signIn = async (req, res) => {
    const { phone, password } = req.body;
    console.log(phone)
    try {
        const findUser = await User.findOne({ phone }).populate('password')
        console.log("User", findUser)


        if (findUser) {
            const databasePassword = findUser.password.password
            const isValidPassword = await bcrypt.compare(password, databasePassword)

            const token = jwt.sign({
                _id: findUser._id,
                firstName: findUser.firstName,
                lastName: findUser.lastName,
                gender: findUser.gender,
                dob: findUser.dob
            }, process.env.JWT_SECRET, { expiresIn: "7d" })
            if (isValidPassword) {
                res.status(200).send({
                    message: "Login Successfull",
                    token: token

                })
            } else {
                // 417 expectation failed
                res.status(417).send({ message: "invalid phone number or Password " })
            }

        } else {
            res.status(404).send({ message: "User Doesn`t Exist" })
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
        console.log(err)
    }

}

/**
 * @getAllUser this function basically for admin
 * @param {objecy} req 
 * @param {object} res 
 */
module.exports.getAllUser = async (req, res) => {

    try {
        const users = await User.find()
        if (users) {
            res.status(200).send({ users })
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

/**
 * @getUSerByUserId this function for show his own account
 * @param {obejct} req 
 * @param {obejct} res 
 */

module.exports.getUserByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById({ _id: id })
        if (user) {
            res.status(200).send({ user })
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
module.exports.changePassword = async (req, res) => {

}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
module.exports.forgotPassword = async function (req, res) {

}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @addUserPhoto it should override the past default avatar path
 *  this avatar field add one user model ,, default avatar
 * @PUT
 */

const fs = require("fs")
const path = require("path")

module.exports.addUserPhoto = async (req, res) => {
    const { user: _id } = req.body
    const findUser = await User.findById({ _id })
        .select({ _id: true, avatar: true, firstName: true, lastName: true });

    if (findUser.avatar !== path.join(`${__dirname}/../avatar/avatar.png`)) {
        fs.unlink(findUser.avatar, async (err) => {
            if (err) {
                res.status(500).send({ message: err.message })
            } else {
                try {
                    const avatarPathUpdate = await User.findByIdAndUpdate(_id, { avatar: req.files.photo[0].path }, { new: true })
                    if (avatarPathUpdate) {
                        res.status(200).send(avatarPathUpdate)
                    } else {
                        res.status(500).send({ message: "Somethindg Went Wrong !" })
                    }
                } catch (err) {
                    res.status(500).send({ message: err.message })
                    // console.log(err)
                }
            }
        })
        console.log("Upload Images Delete !")
    } else {
        console.log("Avatar Images Not Deleted")
        try {
            const avatarPathUpdate = await User.findByIdAndUpdate(_id, { avatar: req.files.photo[0].path }, { new: true })
            if (avatarPathUpdate) {
                res.status(200).send(avatarPathUpdate)
            } else {
                res.status(500).send({ message: "Somethindg Went Wrong !" })
            }
        } catch (err) {
            res.status(500).send({ message: err.message })
            // console.log(err)
        }
    }




}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
module.exports.getAvatarByUserId = async (req, res) => {
    const { id } = req.query;

    try {
        const findAvatar = await User.findOne({ _id: id })
            .select({ _id: true, avatar: true, firstName: true, lastName: true });
        if (findAvatar) {
            res.status(200).send({ payload: findAvatar })
        } else {
            res.status(404).send({ message: "Not Found User " })
        }
    } catch (err) {
        res.status(500).send({ message: err.message })

    }
}

