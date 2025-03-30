const LoginHandler = require("../Controllers/AuthControllers/Login.Service")
const RegisterHandler = require("../Controllers/AuthControllers/Register.Service")
const Vefify = require("../Controllers/AuthControllers/Me.Service")
const logoutHandler = require("../Controllers/AuthControllers/logout.service")
const updateHandlers = require("../Controllers/AuthControllers/userupdate.service")
const {ResetPasswordHandler,ForgotPasswordHandler} = require("../Controllers/AuthControllers/passwordReset.service")
const {VerifyHandler,SendVerficationMail} = require("../Controllers/AuthControllers/verifyuser.service")
const {Protected} = require("../middleware/Protected")
const express = require("express");
const AuthRouter = express.Router()

AuthRouter.route("/register").post(RegisterHandler)
AuthRouter.route("/login").post(LoginHandler)
AuthRouter.route("/me").get(Vefify)
AuthRouter.route("/logout").get(logoutHandler)
AuthRouter.route("/updateMe").patch(updateHandlers)
AuthRouter.route("/forgotpassword").patch(ForgotPasswordHandler)
AuthRouter.route("/resetpassword/:token").patch(ResetPasswordHandler)
AuthRouter.use(Protected)
AuthRouter.route('/sendverificationlink').get(SendVerficationMail);
AuthRouter.route("/verifyuser/:token").get(VerifyHandler)
module.exports = AuthRouter