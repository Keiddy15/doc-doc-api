import app from "./app.js";
import { sequelize } from "./database/database.js";
import Config from "./config.js";
import { DataTypes } from "sequelize";
import Models from './models/index.js'

async function main() {
  await sequelize.sync({ force: false });
  app.listen(Config.PORT, () => {
    console.log(`Doc-Doc API listening on port ${Config.PORT}`);
  });
}

main();