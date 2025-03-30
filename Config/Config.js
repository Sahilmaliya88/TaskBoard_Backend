module.exports = {
    MONGODB_USERNAME:process.env.MONGO_INITDB_ROOT_USERNAME || "root",
    MONGODB_PASSWORD:process.env.MONGO_INITDB_ROOT_PASSWORD || "root",
    SESSION_SECRET:process.env.SESSION_SECRET || "secret",
    REDIS_HOST:process.env.REDIS_HOST || "host",
    REDIS_PORT:process.env.REDIS_PORT || 888,
    port:process.env.port || 4000
}