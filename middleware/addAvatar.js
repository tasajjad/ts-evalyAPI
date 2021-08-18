const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(`${__dirname}/../uploads/user/images`)
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const extention = path.extname(file.originalname)
        const fileName = file.originalname.replace(extention, "")
            .toLocaleLowerCase()
            .split(" ")
            .join("-")

        cb(null, +  Date.now() + "--" + fileName + extention)
    }
})

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
            cb(null, true)
        } else {
            cb(new Error("Only .jpg .png .jpeg format allowed ! Please Try again !"))
        }

    }

})

module.exports = upload;