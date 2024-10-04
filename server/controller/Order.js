const { Order } = require("../model/Order");

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const doc = await order.save();
    res.status(201).json(doc);
  } catch (error) {    
    res.status(400).json(error);
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Order.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchOrderByUser = async (req, res) => {
  const { user, _page = 1, _limit = 18 } = req.query;

  try {
    const orders = await Order.find(user ? { user: user } : {})
      .skip((_page - 1) * _limit)
      .limit(_limit);

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for the given user" });
    }

    res.status(200).json({
      orders,
      currentPage: _page,
      totalPages: Math.ceil(orders.length / _limit),
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("product");
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};
