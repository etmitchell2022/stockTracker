const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

//Use body parser
app.use(bodyParser.urlencoded({
  extended: false
}));

//API key = pk_2bb706c75ea345e1b5a8a28132acf7a7
//Create call API function
function call_api(finishedAPI, name) {
  request(
    "https://cloud.iexapis.com/stable/stock/" + name + "/quote?token=pk_2bb706c75ea345e1b5a8a28132acf7a7", {
      json: true
    },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      if (res.statusCode === 200) {
        finishedAPI(body);
      }
    }
  );
}

//Set Handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Landing page route
app.get("/", function (req, res) {
  res.render("landing", {});
});

//Set handlebar GET routes
app.get("/home", function (req, res) {
  call_api(function (doneAPI) {
    res.render("home", {
      stock: doneAPI,
    });
  });
});

//Set handlebar index POST routes
app.post("/", function (req, res) {
  call_api(function (doneAPI) {
    res.render("home", {
      stock: doneAPI,
    });
  }, req.body.stock_ticker);
});

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log("server is listening on port " + PORT);
});