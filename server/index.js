const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const productsRouters = require("./routes/Products");
const brandsRouters = require("./routes/Brands");
const categoriesRouters = require("./routes/Categories");
const authRouters = require("./routes/Auth");
const userRouters = require("./routes/User");
const cartRouters = require("./routes/Cart");
require('dotenv').config();

server.use(express.json());
server.use(morgan("dev"));
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use("/products", productsRouters.router);
server.use("/brands", brandsRouters.router);
server.use("/categories", categoriesRouters.router);
server.use("/auth", authRouters.router);
server.use("/users", userRouters.router);
server.use("/cart", cartRouters.router);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    process.env.MONGO_DB
  );
  console.log("DataBase connected");
}

server.get("/", (req, res) => {
  res.json({ status: "Success" });
});

server.listen(8080, () => {
  console.log("Server started");
});
