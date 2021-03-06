"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("columns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.STRING,
      },
      contents: {
        type: Sequelize.TEXT,
      },
      title: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      author_id: {
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        type: Sequelize.INTEGER,
        onDelete: "cascade",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("columns");
  },
};
