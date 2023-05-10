const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Images",
    {
      imageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "image_id",
      },
      nameImage: {
        type: DataTypes.STRING,
        field: "name_image",
      },
      url: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
        allowNull: false,
      },
    },
    {
      tableName: "images",
      timestamps: false,
    }
  );
};
