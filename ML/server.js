const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = 3000;

app.post("/home", function (req, res) {
  request(
    { method: "POST", url: "http://127.0.0.1:5000/ml", json: req.body },
    function (error, response, body) {
      console.error("error:", error); // Print the error
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the data received
      res.send(body); //Display the response on the website
    }
  );
});

app.listen(PORT, function () {
  console.log("Listening on Port 3000");
});
