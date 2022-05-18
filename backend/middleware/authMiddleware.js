const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
// Bearer tokenname
// token format in headers
const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from headers
            token = req.headers.authorization.split(" ")[1]

            //verify token
            const verify = jwt.verify(token, process.env.JWT_SECRET)

            //get user from the token
            req.user = await User.findById(verify.id).select('-password')
            next()
        }catch(e){
            console.log(e)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {
    protect
}