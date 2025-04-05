// packages
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" }); // Move this to the top
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const session = require("express-session");
const redis = require("redis");
const { SESSION_SECRET, REDIS_HOST, REDIS_PORT, port } = require("./Config/Config");
const { RedisStore } = require("connect-redis");
const Router = require("./Routers/router");
require("./Db/DbConnect");
const app = express();
const server = createServer(app);
// Redis client
const Redis_Client = redis.createClient({
  socket:{

    host: REDIS_HOST, // Customize Redis host
    port: REDIS_PORT || 6379,       // Default Redis port       // If Redis requires a password
  }
})
Redis_Client.connect().then(()=>console.log("Connected to redis")).catch(err=>console.log(err.message))
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === "development" ? "*" : [],
  credentials: true
}));
app.use(cookieParser());

app.use(session({
  store: new RedisStore({ client: Redis_Client ,ttl:10*60*60*1000}),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: "/",
    httpOnly: true, // It’s a good security practice
    secure: process.env.NODE_ENV === "production", // Only true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }
}));
app.use((req,res,next)=>{
  if(req.session){
    req.session._garbage = Date()
    req.session.touch()
  }
  next()
})
// server
app.get("/", (request, response) => {
  response.send("hello from sahil")
});

// routers
app.use("/api/v1", Router);
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
