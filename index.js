//packages
const express = require("express");
const dotenv = require("dotenv")
dotenv.config({path:"./.env"})
//server
const app = express()
app.get("/",(req,res)=>{
    res.send("hello")
})
const port = process.env.port || 4000
app.listen(port,()=>{
    console.log(`Server Started on ${port}`)
})
