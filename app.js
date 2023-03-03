const express = require("express");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./config/database");
const gigsRouter = require("./routes/gigs");
const {
  allowInsecurePrototypeAccess
} = require("@handlebars/allow-prototype-access");

const app = express();
//handlebars init
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);
app.set("view engine", "handlebars");

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//db connection test
db
  .authenticate()
  .then(() => console.log("database connected..."))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.render("index", { layout: "landing" });
});

app.use("/gigs", gigsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
