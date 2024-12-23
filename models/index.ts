import User from "./User";
import Cart from "./Cart";

User.hasOne(Cart);
Cart.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export { User, Cart };
