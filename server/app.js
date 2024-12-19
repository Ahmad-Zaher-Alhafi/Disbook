const express = require("express");
const session = require("express-session");

const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const cors = require("cors");
const dotenv = require("dotenv");

const userRouter = require("./routes/userRouter");
const userController = require("./controllers/userController");

const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { getUserSoketId, setUserSoketId } = require("./tempDataStorage");

require("./fakeUserGenerator");

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

const corsOptions = {
  origin: process.env.CORS_ORIGINS,
};

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

io.use((socket, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user) {
      return next(new Error("Authentication error"));
    }

    // Attach the authenticated user to the socket
    socket.user = user;
    next();
  })(socket.request);
});

io.on("connection", (socket) => {
  const sender = socket.user;
  setUserSoketId(sender.id, socket.id);
  console.log(
    `${io.sockets.sockets.size}: ${sender.username} established connection to:`,
    socket.id
  );
  console.log("Num of soket connections:", io.sockets.sockets.size);

  socket.on("message", async (data) => {
    const { recieverId, content } = data;
    const reciever = await userController.getUserById(recieverId);

    let message = await userController.addMessage(
      sender.id,
      recieverId,
      content
    );

    message = {
      ...message,
      sender,
      reciever,
    };

    console.log("Message received:", message);
    const recieverSoketId = getUserSoketId(recieverId);
    const senderSoketId = getUserSoketId(sender.id);
    io.to(senderSoketId).to(recieverSoketId).emit("message", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    console.log("Num of soket connections: " + io.sockets.sockets.size);
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use(cors(corsOptions));

app.use("/", userRouter);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}`);
});
