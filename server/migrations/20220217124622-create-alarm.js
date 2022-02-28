"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("alarms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      is_read: {
        type: Sequelize.BOOLEAN,
      },
      user_id: {
        references: {
          model: "users",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      debate_id: {
        references: {
          model: "debates",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("alarms");
  },
};
