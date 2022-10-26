import express from "express";
import cors from "cors";
import Config from "./config.js";
import bodyParser from 'body-parser'
import morgan from "morgan";

console.log(Config)

//Init express
const app = express();

//Settings
app.set("port", Config.PORT || 3000);

//Importing Routes
import Routes from "./routes/index.js";

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var corsOptions = {
  credentials: true,
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(morgan("dev"));

//Global Variables
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Routes
app.use('/', Routes.Main)
app.use('/user', Routes.User)
app.use('/auth', Routes.Auth)

export default app
