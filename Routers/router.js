const express = require("express")
const Router = express.Router()
const AuthRouter = require("./auth.router")
const OauthRouter = require("./Oauth")
Router.get("/",(req,res)=>{
    res.send("hello from route")
})
Router.use("/auth",AuthRouter)
Router.use("/Oauth",OauthRouter)
module.exports = Router