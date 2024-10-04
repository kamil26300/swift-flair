const { User } = require("../model/User");
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    const doc = await user.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
    } else {
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (validPassword) {
        res.status(201).json({
          id: user.id,
          email: user.email,
          addresses: user.addresses,
          name: user.name,
          role: user.role,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
