const userServices = {
  register: (body) => {
    const { username, password, gander, birth } = body
    return sqlQuery(
      `INSERT INTO user (username,password,gender,birth) VALUES ('${username}','${password}','${gander}','${birth}')`
    )
  },
  checkUsername: (username) => {
    return sqlQuery(`SELECT username FROM user WHERE username ='${username}'`)
  },
  login: ({ username, password }) => {
    return sqlQuery(
      `SELECT * FROM user WHERE username='${username}' AND password='${password}'`
    )
  },
}

module.exports = userServices
