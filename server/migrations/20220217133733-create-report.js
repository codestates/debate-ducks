"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reports", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      debate_id: {
        references: {
          model: "debates",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      repoter_id: {
        references: {
          model: "users",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      column_id: {
        references: {
          model: "columns",
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
    await queryInterface.dropTable("reports");
  },
};
