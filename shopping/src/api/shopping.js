const { CUSTOMER_BINDING_KEY } = require("../config");
const ShoppingService = require("../services/shopping-service");
// const { PublishCustomerEvent } = require("../utils");
const { SubscribeMessage, PublishMessage } = require("../utils");
const UserAuth = require("./middlewares/auth");

module.exports = (app, channel) => {
  const service = new ShoppingService();
  SubscribeMessage(channel, service);

  app.post("/order", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;

    const { data } = await service.PlaceOrder({ _id, txnNumber });

    const payload = await service.GetOrderPayload(_id, data, "CREATE_ORDER");

    // PublishCustomerEvent(payload)
    PublishMessage(channel, CUSTOMER_BINDING_KEY, JSON.stringify(payload));

    res.status(200).json(data);
  });

  app.get("/orders", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    console.log("_id");
    console.log(_id);
    try {
      const { data } = await service.GetOrders(_id);
      console.log("data");
      console.log(data);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    console.log("_id");

    const { data } = await service.GetCart({ _id });
    console.log(data);
    return res.status(200).json(data);
  });
};
