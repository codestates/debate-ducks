"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Factcheck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.factcheck.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "id",
      });
      models.factcheck.belongsTo(models.debate, {
        foreignKey: "debate_id",
        targetKey: "id",
      });
    }
  }
  Factcheck.init(
    {
      pros: DataTypes.BOOLEAN,
      desc: DataTypes.TEXT,
      url: DataTypes.STRING,
      debate_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "factcheck",
    },
  );
  return Factcheck;
};
