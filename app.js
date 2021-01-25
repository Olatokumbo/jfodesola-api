const express = require("express");
const transporter = require("./transporter");
const bodyParser = require("body-parser");
const port = 8000;
const app = express();
const cors = require('cors');
require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
  const data = {
    from,
    to: process.env.TO,
    subject: `Message from ${name}/${from} (JFOdesola website)`,
    text: `${message}`,
  };

  transporter
    .sendMail(data)
    .then(() => {
      return res.status(200).json({ status: "Message Sent" });
    })
    .catch((error) => {return res.status(404).json({status: "Error in sending Message"})});
});

app.listen(process.env.PORT || port, (req, res) => {
  console.log("Listening at port " + port);
});
