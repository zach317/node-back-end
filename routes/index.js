var express = require('express')
const sqlQuery = require('../config/db.config')
var router = express.Router()

/* GET home page. */
router.get('/', async function (req, res, next) {
  // const result = await sqlQuery('select * from users')
  // console.log('🚀  result', result[0])
  res.render('index', { title: 'Express' })
})

module.exports = router
