const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

const port = 8000;

const app = express();

app.use(express.static("./assets"));
app.use(expressLayouts);
app.use("/", require("./routes"));

app.set("view engine", "ejs");
app.set("views", "./views");

//extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the Server: ${err}`);
    return;
  }
  console.log(`Server is running on the port: ${port}`);
});
