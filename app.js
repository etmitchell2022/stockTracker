const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const app = express();
const request = require("request");

const PORT = process.env.PORT || 3000;

//API key = pk_2bb706c75ea345e1b5a8a28132acf7a7
//Create call API function
function call_api(finishedAPI) {
  request(
    "https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_2bb706c75ea345e1b5a8a28132acf7a7",
    { json: true },
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

//Set handlebar routes
app.get("/", function (req, res) {
  call_api(function (doneAPI) {
    res.render("home", {
      stock: doneAPI,
    });
  });
});

//About page route
app.get("/about.handlebars", function (req, res) {
  res.render("about");
});

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log("server is listening on port " + PORT);
});
