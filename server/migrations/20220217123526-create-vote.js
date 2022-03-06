"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("votes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pros: {
        type: Sequelize.BOOLEAN,
      },
      debate_id: {
        references: {
          model: "debates",
          key: "id",
        },
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "cascade",
      },
      voter_id: {
        references: {
          model: "users",
          key: "id",
        },
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "cascade",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("votes");
  },
};
