"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Opinions", {
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
      debate_id: {
        references: {
          model: "Debates",
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
    await queryInterface.dropTable("Opinions");
  },
};
