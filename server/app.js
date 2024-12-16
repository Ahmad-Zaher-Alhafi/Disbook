const express = require("express");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const dotenv = require("dotenv");

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  origin: process.env.CORS_ORIGINS,
};
app.use(cors(corsOptions));

app.use("/", userRouter);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server is listening to http://localhost:${PORT}`)
);
