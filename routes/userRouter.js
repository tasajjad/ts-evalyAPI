const router = require('express').Router();
const { getUserByUserId, addUserPhoto, getAvatarByUserId } = require('../controllers/userController')
const upload = require('../middleware/addAvatar');
const { addEmail, getEmailByUserId } = require('../controllers/emailController')

router.route('/add-profile')
    .post(upload.fields([{ name: "photo" }, { name: "user" }]), addUserPhoto)
router.route('/get-profile')
    .get(getAvatarByUserId)

router.route('/email/:id')
    .post(addEmail)
// router.route('/delete-profile')
//     .delete(deleteAvatarByUserId)

router.route('/:id')
    .get(getUserByUserId)

module.exports = router;