const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Value = require("./model/model.js");
const path = require("path");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true }));

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}

main()
  .then((res) => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  // res.send("hello sidie");
  res.render("index");
});

app.post("/", async (req, res) => {
  try {
    const { category, amount, info, date } = req.body;
    let newRecord = new Value({
      category,
      amount,
      info,
      date,
    });
    await newRecord.save();
    console.log("new data recorded");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
