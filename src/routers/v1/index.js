const express = require("express");
const authorization = require("../../middlewares/authorization");
const upload = require("../../middlewares/upload");
const authController = require("../../controllers/auth.controller");
const userController = require("../../controllers/user.controller");
const imageController = require("../../controllers/image.controller");
const commentController = require("../../controllers/comment.controller");
const savedController = require("../../controllers/saveImage.controller");

const v1 = express.Router();

// Auth
v1.post("/login", authController.login());
v1.post("/register", authController.register());
v1.get("/profile", authorization, authController.getProfile());

// User
v1.get("/user/:userId", authorization, userController.getUserById());
v1.put("/user/:userId", authorization, userController.updateUser());
v1.post(
  "/user/uploadAvatar/:userId",
  upload.single("file"),
  userController.uploadAvatar()
);

// Image
v1.get("/images", imageController.getImages());
v1.get("/images/:imageId", imageController.getImageById());
v1.get("/images/user/:userId", authorization, imageController.getImageByUser());
v1.post(
  "/images",
  authorization,
  upload.single("file"),
  imageController.createdImage()
);
v1.post(
  "/images/upload/:imageId",
  authorization,
  upload.single("file"),
  imageController.uploadImage()
);
v1.delete("/images/:imageId", authorization, imageController.deleteImage());

v1.get(
  "/images/search/:nameImage",
  authorization,
  imageController.searchImage()
);

// Comment
v1.get(
  "/comments/image/:imageId",
  authorization,
  commentController.getCommentByImageId()
);
v1.post("/comments", authorization, commentController.createComment());

// Saved
v1.get("/saved/image/:imageId", authorization, savedController.getSavedImage());
v1.get("/saved/user/:userId", authorization, savedController.getSavedByUser());
v1.post("/saved/image/:imageId",authorization, savedController.postSaved());

module.exports = v1;
