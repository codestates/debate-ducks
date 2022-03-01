"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("debates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.STRING,
      },
      participant_id: {
        type: Sequelize.INTEGER,
      },
      pros_id: {
        type: Sequelize.INTEGER,
      },
      cons_id: {
        type: Sequelize.INTEGER,
      },
      topic: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      video: {
        type: Sequelize.STRING,
      },
      ended_at: {
        type: Sequelize.DATE,
      },
      host_id: {
        references: {
          model: "users",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("debates");
  },
};
