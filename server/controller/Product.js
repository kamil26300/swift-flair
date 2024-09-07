const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const response = await newProduct.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllProductsByFilter = async (req, res) => {
  let query = Product.find({});
  let totalItems = Product.find({});
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalItems = totalItems.find({ category: req.query.category });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalItems = totalItems.find({ brand: req.query.brand });
  }
  if (req.query.deleted) {
    query = query.find({ deleted: req.query.deleted });
    totalItems = totalItems.find({ deleted: req.query.deleted });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalItems = totalItems.sort({ [req.query._sort]: req.query._order });
  }

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    const totalLength = await totalItems.countDocuments();
    res.set("X-Total-Count", totalLength);    
    
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};
