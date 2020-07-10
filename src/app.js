const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Path Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

//* Home Route
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Pradhumn",
  });
});

//* Help Route
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    desc: "Help Dynamic Page",
    name: "Pradhumn Dave",
  });
});

//* About Route
app.get("/about", (req, res) => [
  res.render("about", {
    title: "About Page",
    name: "Pradhumn Dave",
  }),
]);

// weather as JSON data
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address query",
    });
  }

  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        error: err,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        res.send({
          error,
        });
      }
      const address = req.query.address;
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

// Test
app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    message: "Help article not found",
    name: "Pradhumn Dave",
    title: "404 Page",
  });
});

app.get("*", (req, res) => [
  res.render("error", {
    message: "Page not found",
    name: "Pradhumn Dave",
    title: "404 Page",
  }),
]);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
