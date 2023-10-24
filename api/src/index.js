require("dotenv").config();
const express = require("express");
const router = require("./router");
const app = express();

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  return res.json("https://github.com/gsprcntdr/football-api");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
