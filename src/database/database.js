import Sequelize from "sequelize";
import Config from "../config.js";

export const sequelize = new Sequelize(
  Config.DATABASE_NAME,
  Config.DATABASE_USERNAME,
  Config.DATABASE_PASSWORD,
  {
    host: Config.DATABASE_HOST,
    dialect: Config.DATABASE_DIALECT,
    port: Config.DATABASE_PORT,
  }
);
