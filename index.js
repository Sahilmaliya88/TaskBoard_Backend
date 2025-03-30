//packages
const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const cokkieParser = require("cookie-parser")
const {createServer} = require("http")
const session = require("express-session")
const redis = require("redis");
const { SESSION_SECRET } = require("./Config/Config");
const RedisStore = require("connect-redis")(session)
require("./Db/DbConnect")
const app = express()
const server = createServer(app)

//redis client
const Redis_Client = redis.createClient()
app.use(express.json())
app.use(cors({
    origin: process.env.NODE_ENV === "development" ? "*":[],
    credentials:true
}))
app.use(cokkieParser())
app.use(session({
    store:new RedisStore({Redis_Client}),
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        path:"/",
        httpOnly:false,
        secure:process.env.NODE_ENV === "production",
        maxAge:24*60*60*60*1000
    }
}))
dotenv.config({path:"./.env"})
//server
app.get("/",(_request,response)=>{
    res.send("<h1>hello from sahil</h1>")
})
const port = process.env.port || 4000
server.listen(port,()=>{
    console.log(`Server Started on ${port}`)
})
