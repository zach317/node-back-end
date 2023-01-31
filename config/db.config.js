const mysql = require('mysql2')
const config = dbConfig()
const promisePool = mysql.createPool(config).promise()
const sqlQuery = async (sql) => await promisePool.query(sql)

function dbConfig() {
  return {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'test_user',
    connectionLimit: 1, //创建几个连接池
  }
}

global.sqlQuery = sqlQuery

module.exports = sqlQuery
