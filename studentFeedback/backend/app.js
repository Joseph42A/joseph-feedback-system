const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const userRoute = require("./routes/userRoute.js");
const formRoute = require("./routes/formRoute.js");

// Middlewar
app.use(morgan("dev"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello to Joseph student feedback system");
});

// Routes
app.use("/api", userRoute);
app.use("/api", formRoute);

module.exports = app;
