const express = require("express");
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './config/.env'})
require("./config/db")
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const dotenv = require("dotenv")
const apiUser = require("./apiUser");
const apiAuth = require("./apiAuth");
const apiTwist= require("./apiTwist");

dotenv.config();
const app = express();
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) =>{
    res.status(200).send(res.locals.user.id);
});

app.use("/serveur/user", apiUser);
app.use("/serveur/auth", apiAuth);
app.use("/serveur/twist", apiTwist)

exports.default = app;
