import Sequelize, { Model } from 'sequelize'
import sequelize from '@/config/database'

interface UserInstance extends Model {
    password: string;
    username: string;
    email: string;
}

const User = sequelize.define<UserInstance>(
    "user",
    {
      username: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
    },
    {
      updatedAt: false,
    }
  );

  export default User

