const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app.js");

const PORT = process.env.PORT || 5000;
const db = process.env.DB_URL;

mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connect to db 😍"));
app.listen(PORT, () =>
  console.log("App Running on port : http://localhost:", PORT)
);
