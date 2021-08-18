const router = require('express').Router();

const { getAllUser } = require('../controllers/userController')

router.route('/get-all-user')
    .get(getAllUser)

module.exports = router