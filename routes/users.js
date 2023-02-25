var express = require('express')
var router = express.Router()
const userController = require('../controllers/users')
const multer = require('multer')

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
