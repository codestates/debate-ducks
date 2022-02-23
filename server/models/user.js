"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.debate, {
        foreignKey: "host_id",
        sourceKey: "id",
      });
      models.user.hasMany(models.column, {
        foreignKey: "author_id",
        sourceKey: "id",
      });
      models.user.hasMany(models.opinion, {
        foreignKey: "author_id",
        sourceKey: "id",
      });
      models.user.hasMany(models.prep, {
        foreignKey: "author_id",
        sourceKey: "id",
      });
      models.user.hasMany(models.factcheck, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      models.user.hasMany(models.vote, {
        foreignKey: "voter_id",
        sourceKey: "id",
      });
      models.user.hasMany(models.alarm, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      models.user.hasMany(models.likey, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      models.user.hasMany(models.report, {
        foreignKey: "repoter_id",
        sourceKey: "id",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      point: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      profile: DataTypes.STRING,
      sign_method: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "user",
    },
  );
  return User;
};
