const {exec,escape} = require('../db/mysql')
const { getPassword } = require('../utils/crypto.js')

const login = (username,password)=>{
    username = escape(username)

    //生成加密密码
    password = getPassword(password)
    password = escape(password)

const sql = `
       select username, realname from users where username = ${username} and password = ${password}
    `
return exec(sql).then(rows=>{
    console.log(rows[0]);
    return rows[0] || {}
})
}

module.exports = {
    login
}
