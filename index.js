const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);
const scssMiddleware = require("node-sass-middleware");

const port = 8000;

const app = express();

app.use(
  scssMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded());

app.use(express.static("./assets"));
app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setup the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookie in the database
app.use(
  session({
    name: "codeial",
    //TODO change the secret before employment
    secret: "somethingRandom",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the Server: ${err}`);
    return;
  }
  console.log(`Server is running on the port: ${port}`);
});
