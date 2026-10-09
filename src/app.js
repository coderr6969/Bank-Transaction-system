const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");

// Two man functions of app.js - Create server :express() and
// Configuring. the server- middlewares and APIs
const app = express();

app.use("cookieParser");

app.use(" express.json");

app.use("/api/auth ", authRouter);

module.exports = app;
