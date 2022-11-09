require("./config/mongo")
const express = require("express");
const path = require("path")
const hbs = require("express-handlebars");
const session = require("express-session")
const PORT = 3000
const app = express();
const routeContact = require("./routes/contactRt");
const auth = require("./helpers/auth")


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));


//Configuracion de Handlebars
app.engine(".hbs", hbs.engine({extname: "hbs", helpers: require('./helpers/hbsFunctions')}));
app.set("view engine", "hbs");
app.set("views", "./views");

//Otras config
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use("/users", require("./routes/usersRt"))
app.use("/contact", routeContact)

//se escucha el puerto, si no hay error nos muestra home.
app.listen(PORT, (err) => {
    !err ? console.log(`Running on http://localhost:${PORT}`) : console.log('Essssplotó todooo');
  })
  app.get("/", (req, res) => {
    res.render("home", {user: req.session.user})
  })

  app.get("/secret", auth, (req,res)=>{
    res.render("secret", {user: `${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user._id})
  })
  app.get("/noAuth", (req,res)=>{
    res.render("noAuth")
  })
