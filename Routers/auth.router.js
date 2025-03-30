const LoginHandler = require("../Controllers/AuthControllers/Login.Service")
const RegisterHandler = require("../Controllers/AuthControllers/Register.Service")
const Vefify = require("../Controllers/AuthControllers/Me.Service")
const logoutHandler = require("../Controllers/AuthControllers/logout.service")
const express = require("express");
const AuthRouter = express.Router()

AuthRouter.route("/register").post(RegisterHandler)
AuthRouter.route("/login").post(LoginHandler)
AuthRouter.route("/me").get(Vefify)
AuthRouter.route("/logout").get(logoutHandler)
module.exports = AuthRouter