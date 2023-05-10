
const response = require('../helper/response');
const saveService = require('../services/saveImage.service');

const getSavedImage = () => {
    return async (req,res,next) => {
        try {
            const { imageId } = req.params;
            const { userId } = req.body;
            const saved = await saveService.getSavedImage(userId ,imageId);
            
            res.status(200).json(response(saved));
        } catch (error) {
            next(error);
        }
    }
}

const getSavedByUser = () => {
    return async (req,res,next) => {
        try {
            const { userId } = req.params;
            
            const savedByUser = await saveService.getSavedByUser(userId);

            res.status(200).json(response(savedByUser));
        } catch (error) {
            next(error);
        }
    }
}

const postSaved = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            const { userId } = req.body;
            
            await saveService.postSaved(userId,imageId);

            res.status(201).json(response("OK"));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    getSavedImage,
    getSavedByUser,
    postSaved,
}