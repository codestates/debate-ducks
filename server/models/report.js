"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.report.belongsTo(models.user, {
        foreignKey: "repoter_id",
        targetKey: "id",
      });
      models.report.belongsTo(models.debate, {
        foreignKey: "debate_id",
        targetKey: "id",
      });
      models.report.belongsTo(models.column, {
        foreignKey: "column_id",
        targetKey: "id",
      });
    }
  }
  Report.init(
    {
      debate_id: DataTypes.INTEGER,
      repoter_id: DataTypes.INTEGER,
      column_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Report",
    },
  );
  return Report;
};
