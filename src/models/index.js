const { Sequelize } = require("sequelize");
const configs = require("../config");


// const sequelize = new Sequelize("capstone-orm-image","root","1234", {
//     dialect: "mysql",
//     host: "localhost",
//     port: 3306,
// });


const sequelize = new Sequelize(
  configs.DB_NAME,
  configs.DB_USER,
  configs.DB_PASSWORD,
  {
    dialect: configs.DB_DIALECT,
    host: configs.DB_HOST,
    port: configs.DB_PORT,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize connected");
  } catch (error) {
    console.log("Sequelize Error", error);
  }
})();

//Khởi tạo Models
const User = require("./User")(sequelize);
const Image = require("./Image")(sequelize);

const Comment = require("./Comments")(sequelize);
const SaveImage = require("./SaveImage")(sequelize);

// 1 User - N Images
User.hasMany(Image, { as: "images", foreignKey: "userId" });
Image.belongsTo(User, { as: "user", foreignKey: "userId" });

// N User - comment - N Image
User.belongsToMany(Image, {
  as: "CommentedImage",
  through: Comment,
  foreignKey: "userId",
});

Image.belongsToMany(User, {
  as: "userCommented",
  through: Comment,
  foreignKey: "imageId",
});

// N User - saveImage - N Image
User.belongsToMany(Image, {
  as: "savedImage",
  through: SaveImage,
  foreignKey: "userId",
});

Image.belongsToMany(User, {
  as: "userSaved",
  through: SaveImage,
  foreignKey: "imageId",
});

module.exports = {
  sequelize,
  User,
  Image,
  Comment,
  SaveImage,
};
