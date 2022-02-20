"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Column extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.column.belongsTo(models.user, {
        foreignKey: "author_id",
        targetKey: "id",
      });
      models.column.hasMany(models.opinion, {
        foreignKey: "column_id",
        sourceKey: "id",
      });
      models.column.hasMany(models.likey, {
        foreignKey: "column_id",
        sourceKey: "id",
      });
      models.column.hasMany(models.report, {
        foreignKey: "column_id",
        sourceKey: "id",
      });
    }
  }
  Column.init(
    {
      category: DataTypes.STRING,
      contents: DataTypes.STRING,
      image: DataTypes.STRING,
      author_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Column",
    },
  );
  return Column;
};
