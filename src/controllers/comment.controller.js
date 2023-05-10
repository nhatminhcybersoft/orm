const response = require("../helper/response");
const commentService = require("../services/comment.service");

const getCommentByImageId = () => {
    return async (req,res,next) => {
        try {
            const { imageId } = req.params;

            const comments = await commentService.getCommentByImageId(imageId);

            res.status(200).json(response(comments));
        } catch (error) {
            next(error);
        }
    }
}

const createComment = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const comment = await commentService.createComment(data);

      res.status(201).json(response(comment));
    } catch (error) {
      next(error);
    }
  };
};


module.exports = {
    getCommentByImageId,
    createComment,
}
