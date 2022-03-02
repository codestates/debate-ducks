"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.prep.belongsTo(models.user, {
        foreignKey: "author_id",
        targetKey: "id",
      });
      models.prep.belongsTo(models.debate, {
        foreignKey: "debate_id",
        targetKey: "id",
      });
    }
  }
  Prep.init(
    {
      contents: DataTypes.TEXT,
      debate_id: DataTypes.INTEGER,
      author_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "prep",
    },
  );
  return Prep;
};
