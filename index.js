const express = require("express");
const app = express();
const port = 8000;

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile("index.html", {
    root: __dirname + "/public",
  });
});

app.listen(port, () => {
  console.log("Now listening on port 8000");
});
