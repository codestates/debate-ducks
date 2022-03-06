"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("opinions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contents: {
        type: Sequelize.STRING,
      },
      pros: {
        type: Sequelize.BOOLEAN,
      },
      author_id: {
        references: {
          model: "users",
          key: "id",
        },
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "cascade",
      },
      column_id: {
        references: {
          model: "columns",
          key: "id",
        },
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "cascade",
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
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("opinions");
  },
};
