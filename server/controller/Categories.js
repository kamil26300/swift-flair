const { Categories } = require("../model/Categories")

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Categories.find({}).exec()
    res.status(200).json(categories)
    
  } catch (error) {
    res.status(400).json(error)
  }
}

exports.createCategory = async (req, res) => {
  const category = new Categories(req.body);
  try {
    const doc = await category.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
