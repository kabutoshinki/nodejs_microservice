const ShoppingService = require("../services/shopping-service");

module.exports = (app) => {
  const service = new ShoppingService();
  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;
    console.log("payload");
    console.log(payload);
    console.log("============ Shopping Service receoved Event =======");
    service.SubscribeEvents(payload);
    return res.status(200).json(payload);
  });
};
