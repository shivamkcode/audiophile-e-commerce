import { Sequelize } from "sequelize";
import pg from "pg";

const sequelize = new Sequelize(`${process.env.DB_STRING}`, {
  dialect: "postgres",
  pool: { max: 5, min: 0, idle: 10000 },
  dialectModule: pg,
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;
