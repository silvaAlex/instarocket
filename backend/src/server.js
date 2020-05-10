const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

dotenv.config();

mongoose.connect(
  `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}?retryWrites=true`,
  {
    useNewUrlParser: true,
  }
);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./routes"));
app.use(cors());

server.listen(process.env.PORT, () => {
  console.log(`listener on port ${process.env.PORT}`);
});
