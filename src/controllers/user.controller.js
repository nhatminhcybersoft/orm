const { AppError } = require("../helper/error");
const response = require("../helper/response");
const userService = require("../services/user.service");

const getUserById = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await userService.getUserById(userId);

      res.status(200).json(response(user));
    } catch (error) {
        next(error);
    }
  };
};

const updateUser = () => {
    return async (req, res, next) => {
        try {
            const { userId } = req.params;
            const data = req.body;
            
            const user = await userService.updateUser(userId,data);

            res.status(200).json(response(user));
        } catch (error) {
            next(error);
        }
    }
}

const uploadAvatar = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;
      const file = req.file;
      
      if(!file){
        throw new AppError(400, "Please upload file");
      }

      const url = `http://localhost:4000//${file.path}`;
      
      const user = await userService.uploadAvatar(userId, url);

      res.status(201).json(response(user));
    } catch (error) {
      next(error);
    }
  }
}


module.exports = {
    getUserById,
    updateUser,
    uploadAvatar,
}
