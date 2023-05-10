const { AppError } = require("../helper/error");
const { User, Image, Comment } = require("../models");

const getCommentByImageId = async (imageId) => {
  try {
    
    const image = await Image.findByPk(imageId);
    if(!image){
        throw new AppError(400, "Image not found");
    }
    
    const comments = Image.findOne({
        where: { imageId},
        include: "userCommented",
    })
    return comments;

  } catch (error) {
    throw error;
  }
};

const createComment = async (data) => {
  try {
    const user = await User.findByPk(data.userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }
    
    const image = await Image.findByPk(data.imageId);
    if (!image) {
      throw new AppError(400, "Image not found");
    }

    const comment = await Comment.create(data);
    return comment;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCommentByImageId,
  createComment,
};
