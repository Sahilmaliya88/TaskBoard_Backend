const express = require("express")
const Router = express.Router()
const AuthRouter = require("./auth.router")
Router.get("/",(req,res)=>{
    res.send("hello from route")
})
Router.use("/auth",AuthRouter)
module.exports = Router