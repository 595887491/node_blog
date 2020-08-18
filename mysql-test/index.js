const mysql = require('mysql');

//创建连接对象
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'myblog'
})

//开始连接
con.connect()

//执行sql 语句
const sql  = `insert into blogs(title,content,createtime,author) values('标题C','内容C','1546870368066','laowang')`;
con.query(sql,(err,result)=>{
    if(err) {
        console.log(err)
        return
    }
    console.log(result)
})
//关闭连接
con.end()
