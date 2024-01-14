import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const sequelize = new Sequelize(`${process.env.DB_STRING}`, {
  dialect: "mysql",
  pool: { max: 5, min: 0, idle: 10000 },
  dialectModule: mysql2,
});
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to db", error);
  }
})();

export default sequelize;
