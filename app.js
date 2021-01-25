const express = require("express");
const transporter = require("./transporter");
const bodyParser = require("body-parser");
const port = 8000;
const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    status: "API is working!!!"
  })
});
app.post("/mail", (req, res) => {
  const from = req.body.from;
  const to = "faithodesola@gmail.com";
  const name = req.body.name;
  const message = req.body.message;
  console.log(req.body);
  transporter
    .sendMail({
      from,
      to: process.env.TO,
      subject: `Message from ${name}/${from} (JFOdesola website)`,
      text: `${message}`,
    })
    .then(() => {
      res.statusCode(200).json({
        status: "Message Sent!!",
      });
    })
    .catch((err) => {
      res.statusCode(404).json({
        status: "Error",
      });
    });
});

app.listen(process.env.PORT || port, (req, res) => {
  console.log("Listening at port " + port);
});
