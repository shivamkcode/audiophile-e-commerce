import Sequelize from "sequelize";
import sequelize from "@/config/database";

const Cart = sequelize.define("cart", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },

  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },

  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Cart