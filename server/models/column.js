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
        onDelete: "cascade",
      });
      models.column.hasMany(models.opinion, {
        foreignKey: "column_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
      models.column.hasMany(models.likey, {
        foreignKey: "column_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
      models.column.hasMany(models.report, {
        foreignKey: "column_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
    }
  }
  Column.init(
    {
      category: DataTypes.STRING,
      contents: DataTypes.TEXT,
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      author_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "column",
    },
  );
  return Column;
};
