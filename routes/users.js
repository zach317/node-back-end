var express = require('express')
var router = express.Router()
const userController = require('../controllers/users')
const multer = require('multer')

// const fileStorage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, 'public/avatars/')
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.originalname)
//   },
// })
// const upload = multer({ storage: fileStorage })

const upload = multer({ dest: 'public/avatars/' })

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/register', userController.register)
router.post('/check-username', userController.checkUsername)
router.post('/login', userController.login)
router.post('/update-userinfo', userController.updateUserInfo)
router.get('/get-userinfo', userController.getUserInfo)
router.post(
  '/update-avatar',
  upload.single('avatar'),
  userController.updateAvatar
)

module.exports = router
