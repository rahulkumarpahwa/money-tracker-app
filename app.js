const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Value = require("./model/model.js");
const path = require("path");
const methodOverride = require("method-override");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

app.get("/", async (req, res) => {
  // res.send("hello to home route");
  const data = await Value.find();
  res.render("index", { data });
  // console.log(data);
});

app.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;
  let deletedData = await Value.findByIdAndDelete(id);
  // console.log(deletedData);
  console.log("data deleted");
  res.redirect("/");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/add", async (req, res) => {
  try {
    const { category, amount, info, date } = req.body;
    // let correctDate = date.split("").reverse().join(""); //reversing the date
    // console.log(req.body);
    let newRecord = new Value({
      category,
      amount,
      info,
      date,
    });
    await newRecord.save();
    console.log("new data recorded");
    res.redirect("back");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
