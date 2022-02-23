require("dotenv").config();

module.exports = {
  // development: {
  //   username: process.env.DATABASE_USERNAME,
  //   password: process.env.DATABASE_PASSWORD,
  //   database: process.env.DATABASE_NAME,
  //   host: process.env.DATABASE_HOST,
  //   port: process.env.DATABASE_PORT,
  //   dialect: "mysql",
  // },
  development: {
    username: "root",
    password: "",
    database: "debate_ducks",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
