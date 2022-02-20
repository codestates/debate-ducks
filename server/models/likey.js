"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.likey.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "id",
      });
      models.likey.belongsTo(models.debate, {
        foreignKey: "debate_id",
        targetKey: "id",
      });
      models.likey.belongsTo(models.column, {
        foreignKey: "column_id",
        targetKey: "id",
      });
    }
  }
  Likey.init(
    {
      user_id: DataTypes.INTEGER,
      column_id: DataTypes.INTEGER,
      debate_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "likey",
    },
  );
  return Likey;
};
