const { AppError } = require("../helper/error");
const response = require("../helper/response");
const imageService = require("../services/image.service");

const getImages = () => {
  return async (req, res, next) => {
    try {
      const images = await imageService.getImages();

      res.status(200).json(response(images));
    } catch (error) {
      next(error);
    }
  };
};

const getImageById = () => {
  return async (req, res, next) => {
    try {
      const { imageId } = req.params;

      const image = await imageService.getImageById(imageId);

      res.status(200).json(response(image));
    } catch (error) {
      next(error);
    }
  };
};

const getImageByUser = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;

      const images = await imageService.getImageByUser(userId);

      res.status(200).json(response(images));
    } catch (error) {
      next(error);
    }
  };
};

const createdImage = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;

      const createdImage = await imageService.createdImage(data);
      res.status(201).json(response(createdImage));
    } catch (error) {
      next(error);
    }
  };
};

const uploadImage = () => {
  return async (req, res, next) => {
    try {
      const file = req.file;
      const { imageId } = req.params;
      if (!file) {
        throw new AppError(400, "please upload file");
      }
      
      const url = `http://localhost:4000//${file.path}`;

      const createdImage = await imageService.uploadImage(imageId, url);

      res.status(201).json(response(createdImage));
    } catch (error) {
      next(error);
    }
  };
};

const deleteImage = () => {
  return async (req, res, next) => {
    try {
      const { imageId } = req.params;

      await imageService.deleteImage(imageId);

      res.status(200).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

const searchImage = () => {
  return async (req, res, next) => {
    try {
      const { nameImage } = req.params;
      
      const image = await imageService.searchImage(nameImage);
      
      res.status(200).json(response(image));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  getImages,
  getImageById,
  getImageByUser,
  createdImage,
  uploadImage,
  deleteImage,
  searchImage,
};
