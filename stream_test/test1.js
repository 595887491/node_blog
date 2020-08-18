//流
// 标准输入输出
// process.stdin.pipe(process.stdout)


// const http = require('http')
// const server = http.createServer((req,res)=>{
//     if(req.method === 'POST') {
//         req.pipe(res) //输出
//     }
// })
// server.listen(9000)

// 复制文件
// const fs =require('fs')
// const path = require('path')
//
// const fileName1 = path.resolve(__dirname,'data.txt')
// const fileName2 = path.resolve(__dirname,'data-bak.txt')
//
// const readStream = fs.createReadStream(fileName1)
// const writeStream = fs.createWriteStream(fileName2)
//
// readStream.pipe(writeStream)
// readStream.on('end',()=>{
//     console.log('copy down');
// })


//创建stream的形式读取文件内容返回给接口
const http = require('http')
const fs =require('fs')
const fileName1 = path.resolve(__dirname,'data.txt')
const server = http.createServer((req,res)=>{
    if(req.method === 'GET') {
        const readStream = fs.createReadStream(fileName1) //创建流 节约性能
        readStream.pipe(res); //读取文件内容返回给response
        // req.pipe(res) //输出
    }
})
server.listen(9000)
