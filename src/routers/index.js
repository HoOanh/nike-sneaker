const sneakerRouter = require("./sneaker");
const apiRouter = require("./api");
const userRouter = require("./user");

function route(app) {
  app.use("/api", apiRouter);

  app.use("/user", userRouter);

  app.use("/", sneakerRouter);
}

module.exports = route;
