"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.vote.belongsTo(models.user, {
        foreignKey: "voter_id",
        targetKey: "id",
        onDelete: "cascade",
      });
      models.vote.belongsTo(models.debate, {
        foreignKey: "debate_id",
        targetKey: "id",
        onDelete: "cascade",
      });
    }
  }
  Vote.init(
    {
      pros: DataTypes.BOOLEAN,
      debate_id: DataTypes.INTEGER,
      voter_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "vote",
    },
  );
  return Vote;
};
