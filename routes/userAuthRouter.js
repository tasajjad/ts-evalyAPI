// Dependencies
const router = require('express').Router()

// Internal Import

const { signUp, signIn, createPassWord } = require('../controllers/userController')

router.route('/signup')
    .post(signUp)

router.route('/password')
    .post(createPassWord)

router.route('/signin')
    .post(signIn)



module.exports = router;