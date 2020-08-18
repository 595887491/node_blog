const { login } = require('../controller/user')
const { SuccessModel , ErrorModel }  = require('../model/resModel');
const { set } =require('../db/redis')

const handleUserRouter = (req,res) => {
    const method = req.method
    // const url = req.url
    // const path = url.split('?')[0]

    //登录
    if(method === 'POST' && req.path === '/api/user/login') {
        const {username,password} = req.body
        // const {username,password} = req.query
        const result = login(username,password)
        return result.then(data=>{
            if(data.username) {
                // 设置session
                req.session.username = data.username;
                req.session.realname = data.realname;
                //同步到redis
                set(req.sessionId,req.session)

                return new SuccessModel()
            }
            return new ErrorModel('账号或密码错误')
        })

    }

    //登录验证测试
    if(method=== 'GET' && req.path === '/api/user/login-test') {
        if(req.session.username) {
            return Promise.resolve(
                new SuccessModel({
                    session:req.session
                })
            )
        }
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}
module.exports = handleUserRouter;
