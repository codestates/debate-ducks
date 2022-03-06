"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Debate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.debate.belongsTo(models.user, {
        foreignKey: "host_id",
        targetKey: "id",
        onDelete: "cascade",
      });
      models.debate.hasMany(models.opinion, {
        foreignKey: "debate_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
      models.debate.hasMany(models.prep, {
        foreignKey: "debate_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
      models.debate.hasMany(models.factcheck, {
        foreignKey: "debate_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
      models.debate.hasMany(models.vote, {
        foreignKey: "debate_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
      models.debate.hasMany(models.alarm, {
        foreignKey: "debate_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
      models.debate.hasMany(models.likey, {
        foreignKey: "debate_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
      models.debate.hasMany(models.report, {
        foreignKey: "debate_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
    }
  }
  Debate.init(
    {
      category: DataTypes.STRING,
      participant_id: DataTypes.INTEGER,
      pros_id: DataTypes.INTEGER,
      cons_id: DataTypes.INTEGER,
      topic: DataTypes.TEXT,
      title: DataTypes.STRING,
      video: DataTypes.STRING,
      ended_at: DataTypes.DATEONLY,
      updated_at: DataTypes.DATEONLY,
      prosProfile: DataTypes.STRING,
      consProfile: DataTypes.STRING,
      prosName: DataTypes.STRING,
      consName: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: "ongoing",
      },
      host_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "debate",
    },
  );
  return Debate;
};
