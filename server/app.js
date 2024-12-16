const express = require("express");
const session = require("express-session");

const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const cors = require("cors");
const dotenv = require("dotenv");

const userRouter = require("./routes/userRouter");
const userController = require("./controllers/userController");

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });

const strategyOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Falafel",
};

passport.use(
  new JwtStrategy(strategyOpts, async (jwt_payload, done) => {
    try {
      const user = await userController.getUserById(jwt_payload.id);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userController.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

const corsOptions = {
  origin: process.env.CORS_ORIGINS,
};
app.use(cors(corsOptions));

app.use("/", userRouter);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server is listening to http://localhost:${PORT}`)
);
