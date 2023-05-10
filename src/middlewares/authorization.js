const jwt = require('jsonwebtoken');
const { AppError } = require('../helper/error');
const { User } = require('../models')


const extractTokenFromHeader = (headers) => {
    const bearerToken = headers.authorization;
    const parts = bearerToken.split(" ");

    if(parts.length !== 2 || parts[0] !== "Bearer" || !parts[1].trim()){
        throw new AppError(401, "Invalid token");
    }
    
    return parts[1];
}

const authorization = async (req,res,next) => {
    try {
        const token = extractTokenFromHeader(req.headers);
        const payload = jwt.verify(token, "cybersoft-node26");
        
        if(!token){
            throw new AppError(401, "Invalid token")
        }

        const user = await User.findByPk(payload.userId);
        if(!user){
            throw new AppError(401, "Invalid token");
        }
        
        res.locals.user = user;

        next();
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            next(new AppError(401, "Invalid token"));
        }
        next(error);
    }
}

module.exports = authorization;