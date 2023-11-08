var express = require('express')
var router = express.Router()
const userController = require('../controllers/users')
const multer = require('multer')
const JWT = require('../utils/JWT')

const upload = multer({ dest: 'public/avatars/' })

const addUserToBody = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  const payload = JWT.verify(token)
  if (token) {
    req.body.id = payload.id
  }
  next()
}

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
  addUserToBody,
  userController.updateAvatar
)
router.get('/user-account-info', userController.getUserAccountInfo)
router.post('/send-sms', userController.sendSms)
router.post('/bind-account', userController.bindAccount)
router.post('/check-bind', userController.checkBind)
router.post('/check-password', userController.checkPassword)
router.post('/change-password', userController.changePassword)

module.exports = router
