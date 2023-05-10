const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Image", {
    userId: {
        type: DataTypes.STRING,
        field: "user_id",
      },
    imageId: {
      type: DataTypes.INTEGER,
      field: "image_id",
    },
    dateSave: {
        type: DataTypes.DATE,
        field: "date_save",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    }
  }, {
    tableName: "save_images",
    timestamps: false,
  });
};