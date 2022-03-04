"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Alarm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.alarm.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "id",
        onDelete: "cascade",
      });
      models.alarm.belongsTo(models.debate, {
        foreignKey: "debate_id",
        targetKey: "id",
        onDelete: "cascade",
      });
    }
  }
  Alarm.init(
    {
      type: DataTypes.STRING,
      is_read: DataTypes.BOOLEAN,
      user_id: DataTypes.INTEGER,
      debate_id: DataTypes.INTEGER,
      created_at: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "alarm",
    },
  );
  return Alarm;
};
