const { AppError } = require("../helper/error");
const { User, Image } = require("../models");

const getSavedImage = async (userId, imageId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }

    const image = await Image.findByPk(imageId);
    if (!image) {
      throw new AppError(400, "Image not found");
    }

    const hasSaved = await image.hasUserSaved(userId);
    if (hasSaved) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

const getSavedByUser = async (userId, imageId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }

    const savedByUser = await User.findOne({
      where: { userId },
      include: "savedImage",
    });

    return savedByUser;
  } catch (error) {
    throw error;
  }
};

const postSaved = async (userId, imageId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new AppError(400, "User not found");
  }

  const image = await Image.findByPk(imageId);
  if (!image) {
    throw new AppError(400, "Image not found");
  }

  const hasSaved = await image.hasUserSaved(user.userId);
  
  if (hasSaved) {
    await image.removeUserSaved(userId);
  } else {
    await image.addUserSaved(userId);
  }

  return null;
};

module.exports = {
  getSavedImage,
  getSavedByUser,
  postSaved,
};
