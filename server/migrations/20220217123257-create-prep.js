"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Preps", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contents: {
        type: Sequelize.STRING,
      },
      debate_id: {
        references: {
          model: "Debates",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      author_id: {
        references: {
          model: "Users",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Preps");
  },
};
