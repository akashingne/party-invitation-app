const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/user.route");
const guestRouter = require("./routes/guest.route");

dotenv.config({ path: "./config/config.env" });

//connect database
connectDB();

const app = express();

//middlewares
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

// router middleware
app.use("/user", userRouter);
app.use("/guest", guestRouter);

module.exports = app;
