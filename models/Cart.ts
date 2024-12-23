import { DataTypes, Model } from "sequelize";
import sequelize from "@/config/database";

class Cart extends Model {}

Cart.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "a_users",
      key: "id",
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: "a_cart",
});

export default Cart;
