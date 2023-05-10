const { AppError } = require("../helper/error");
const { User } = require("../models");
const bcrypt = require('bcrypt');
const { generateToken } = require("../helper/jwt");

const login = async (credentials) => {
    try {
        console.log(credentials)
        const {email, password} = credentials;
        const user = await User.findOne({
            where: {
                email
            },
            attributes: {include: ["password"]},
        })

        if(!user){
            throw new AppError(400, "Email or password invalid");
        }

        const isMatched = bcrypt.compareSync(password, user.password);
        if(!isMatched){
            throw new AppError(400, "Email or password invalid");
        }

        return generateToken(user);
    } catch (error) {
        throw error
    }
}


const register = async (data) => {
    try {
        const user = await User.findOne({
          where: {
            email: data.email,
          },
        });
    
        // Email đã tồn tại trong DB
        if (user) {
          throw new AppError(400, "Email is Existed");
        }
    
        const createdUser = await User.create(data);
        return createdUser;
      } catch (error) {
        throw new AppError(500, "Something went wrong with DB");
      }
}



module.exports = {
    login,
    register,
}