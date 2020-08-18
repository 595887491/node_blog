const http =require('http');
// const bodyparser =  require('body-parser')

const PORT = 8000

const serverHandle = require('../app')

const server=http.createServer(serverHandle)

// server.use(bodyparser

server.listen(PORT,()=>{
    console.log('启动成功');
})
