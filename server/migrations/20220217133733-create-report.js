"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reports", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      debate_id: {
        references: {
          model: "Debates",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      repoter_id: {
        references: {
          model: "Users",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      column_id: {
        references: {
          model: "Columns",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reports");
  },
};
