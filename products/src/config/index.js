const dotEnv = require("dotenv");
dotEnv.config();
// if (process.env.NODE_ENV !== "prod") {
//   console.log("true");
//   // const configFile = `../../.env.${process.env.NODE_ENV}`;
//   const configFile = `../.././.env`;
//   // dotEnv.config({ path: configFile });
//   dotEnv.config();

// } else {
//   dotEnv.config();
// }
console.log("====================================");
console.log(process.env.PORT);
console.log("====================================");
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: "ONLINE_SHOPPING",
  SHOPPING_BINDING_KEY: "SHOPPING_SERVICE",
  CUSTOMER_BINDING_KEY: "CUSTOMER_SERVICE",
};
