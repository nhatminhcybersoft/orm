const { AppError } = require("../helper/error");
const { Image, User } = require("../models");
const { Op } = require("sequelize");

const getImages = async () => {
  try {
    const images = await Image.findAll();

    return images;
  } catch (error) {
    throw error;
  }
};

const getImageById = async (imageId) => {
  try {
    const image = Image.findOne({
      where: { imageId },
      include: "user",
    });
    if (!image) {
      throw new AppError(400, "Image not found");
    }

    return image;
  } catch (error) {
    throw error;
  }
};

const getImageByUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }

    const userHasImages = await User.findOne({
      where: { userId },
      include: "images",
    });
    return userHasImages;
  } catch (error) {}
};

const createdImage = async (data) => {
  try {
    if(!data){
      throw new AppError(400, "Please fill out data")
    }
    const createdImage = await Image.create(data);
    return createdImage;
  } catch (error) {
    throw error;
  }
};

const uploadImage = async (imageId, url) => {
  try {
    const image = Image.findByPk(imageId);
    if (!image) {
      throw new AppError(400, "Image not found");
    }

    await Image.update({ ...image, url }, { where: { imageId } });

    const imageNew = Image.findByPk(imageId);
    return imageNew;
  } catch (error) {
    throw error;
  }
};

const deleteImage = async (imageId) => {
  try {
    const image = Image.findByPk(imageId);
    if (!image) {
      throw new AppError(400, "Image not found");
    }

    await Image.destroy({ where: { imageId } });
  } catch (error) {
    throw error;
  }
};

const searchImage = async (nameImage) => {
  try {
    const images = await Image.findAll({
      where: {
        nameImage: { [Op.like]: "%" + nameImage + "%" },
      },
    });

    return images;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getImages,
  getImageById,
  getImageByUser,
  createdImage,
  uploadImage,
  deleteImage,
  searchImage,
};
