"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Opinion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.opinion.belongsTo(models.user, {
        foreignKey: "author_id",
        targetKey: "id",
        onDelete: "cascade",
      });
      models.opinion.belongsTo(models.debate, {
        foreignKey: "debate_id",
        targetKey: "id",
        onDelete: "cascade",
      });
      models.opinion.belongsTo(models.column, {
        foreignKey: "column_id",
        targetKey: "id",
        onDelete: "cascade",
      });
    }
  }
  Opinion.init(
    {
      contents: DataTypes.STRING,
      pros: DataTypes.BOOLEAN,
      author_id: DataTypes.INTEGER,
      column_id: DataTypes.INTEGER,
      debate_id: DataTypes.INTEGER,
      updated_at: DataTypes.DATEONLY,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "opinion",
    },
  );
  return Opinion;
};
