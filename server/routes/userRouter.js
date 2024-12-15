const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("<h1> Hey there</h1>");
  res.end();
});

userRouter.post("/signup", userController.addUser);

module.exports = userRouter;
