const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async GetCart({ _id }) {
    console.log(_id);
    try {
      const cartItems = await this.repository.Cart(_id);
      console.log("cartItems");
      console.log(cartItems);
      return FormateData(cartItems);
    } catch (error) {
      throw error;
    }
  }
  async PlaceOrder(userInput) {
    const { _id, txnNumber } = userInput;

    // Verify the txn number with payment logs

    try {
      const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
      return FormateData(orderResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      console.log("orders");
      console.log(orders);
      return FormateData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }
  // async GetOrdersDetail(customerId){
  //   try {
  //     const orders = await this.repository.Orders(customerId);
  //     return FormateData(orders);
  //   } catch (err) {
  //     throw new APIError("Data Not found", err);
  //   }
  // }

  async ManageCart(customerId, item, qty, isRemove) {
    try {
      const cartResult = await this.repository.AddToCartItem(customerId, item, qty, isRemove);
      return FormateData(cartResult);
    } catch (error) {
      throw error;
    }
  }

  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);
    const { event, data } = payload;

    const { userId, product, qty } = data;

    switch (event) {
      case "ADD_TO_CART":
        this.ManageCart(userId, product, qty, false);
        break;
      case "REMOVE_FROM_CART":
        this.ManageCart(userId, product, qty, true);
        break;
      case "TEST":
        console.log("Working....Subscriber");
        break;
      default:
        break;
    }
  }

  async GetOrderPayload(userId, order, event) {
    if (order) {
      const payload = {
        event: event,
        data: { userId, order },
      };

      return payload;
    } else {
      return FormateData({ error: "No Order is available" });
    }
  }
}

module.exports = ShoppingService;
