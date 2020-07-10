const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8dc101a445971666f5bd7bb17dc301d5&query=${lat},${long}`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Cannot connect to weather services!", undefined);
    } else if (body.error) {
      callback("unable to find the location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degrees. But it feels like ${body.current.feelslike}`
      );
    }
  });
};

module.exports = forecast;
