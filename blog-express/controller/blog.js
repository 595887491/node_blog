const { exec }  = require('../db/mysql');
const xss  = require('xss')

const getList = (author,keyword) =>{
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql+= `and author ='${author}'`
    }
    if(keyword) {
        sql+= `and title like '%${keyword}%'`
    }
    sql+=`order by createtime desc`;
    //返回 promise
    return exec(sql)
}


const getDetail = (id)=>{
    const sql = `select * from blogs where id = ${id}`
    return exec(sql)
        .then(row=>{
            return row[0]
        })
}

const newBlog = (blogData = {}) =>{
     //blogData是一个博客对象，包含title content 属性
    const title = xss(blogData.title);
    const content = xss(blogData.content);
    const author = blogData.author;
    const createTime = Date.now()
    // console.log('blogData',blogData)
    const sql = `insert into blogs(title,content,createtime,author) values ('${title}','${content}',${createTime},'${author}')`
    return exec(sql).then(insertData=>{
        // console.log('insertData is',insertData)
        return {
            id:insertData.insertId
        }
    })

}

const updateBlog = (id,blogData = {}) =>{
    //id 就是需要更新博客的id
    //blogData是一个博客对象，包含title content 属性

    const title = blogData.title
    const content = blogData.content

    // console.log('blogData',blogData)

    const sql = `
       update blogs set title='${title}',content='${content}' where id=${id}
    `
    return exec(sql).then(updateData=>{
        if(updateData.affectedRows>0) {
            return true
        }
        return false
    })
}

const delBlog = (id,author)=>{
    //id就是要删除博客的 id
    const sql = `
      delete from blogs where id='${id}' and author='${author}'
    `
    return exec(sql).then(deleteData=>{
        if(deleteData.affectedRows>0) {
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
