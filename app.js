const express = require("express");
const morgan = require("morgan");
const { default: mongoose } = require("mongoose");
// const { result } = require("lodash");
// const { render } = require("ejs");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

// Manfo conection!!
const dbUri =
  "mongodb+srv://hadi1001:Seals.1001@node1001.rwqhki3.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbUri)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// midleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// register view engine
app.set("view engine", "ejs");
// app.set('views', 'myviews');

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
