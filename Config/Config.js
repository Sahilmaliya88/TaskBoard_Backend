module.exports = {
    MONGODB_USERNAME:process.env.MONGO_INITDB_ROOT_USERNAME || "root",
    MONGODB_PASSWORD:process.env.MONGO_INITDB_ROOT_PASSWORD || "root",
    SESSION_SECRET:process.env.SESSION_SECRET || "secret"
}