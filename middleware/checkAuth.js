const jwt = require("jsonwebtoken");

const checkAuth = async(req,res,next) => {
    if(!req.headers['x-access-token'])
    {
        return res
            .status(400)
            .json({ status: 400, message: "Token wasn`t founded" })
    }
    try{
        const decoded = jwt.decode(req.headers['x-access-token']);
        if(!decoded)
        {
            return res
                .status(400)
                .json({ status: 400, message: "Incorrect token" })
        }
        req.headers.uniqueId = decoded.user.id
        next()
    }catch(_){
        return res
            .status(400)
            .json({ status: 400, message: "Incorrect token" })
    }
}

module.exports = { checkAuth }