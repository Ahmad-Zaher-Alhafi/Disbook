const express = require("express");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", userRouter);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server is listening to https://localhost:${PORT}`)
);
