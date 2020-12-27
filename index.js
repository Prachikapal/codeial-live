const express = require("express");
const port = 8000;

const app = express();

app.use("/", require("./routes"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the Server: ${err}`);
    return;
  }
  console.log(`Server is running on the port: ${port}`);
});