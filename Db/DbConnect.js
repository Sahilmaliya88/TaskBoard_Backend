const mongoose  = require("mongoose")
const config = require("../Config/Config")

const CONNECTION_URL = `mongodb://${config.MONGODB_USERNAME}:${config.MONGODB_PASSWORD}@mongo:27017/taskbook`
mongoose.connect(CONNECTION_URL,{authSource:"admin"}).then(()=>console.log("Database Connected Successfully")).catch((e)=>console.log(e.message))