module.exports = {
    MONGODB_USERNAME:process.env.MONGO_INITDB_ROOT_USERNAME || "root",
    MONGODB_PASSWORD:process.env.MONGO_INITDB_ROOT_PASSWORD || "root",
    SESSION_SECRET:process.env.SESSION_SECRET || "secret",
    REDIS_HOST:process.env.REDIS_HOST || "host",
    REDIS_PORT:process.env.REDIS_PORT || 888,
    port:process.env.port || 4000,
    SENDER_EMAIL:process.env.SENDER_EMAIL,
    SENDER_PASSWORD:process.env.SENDER_PASSWORD,
    GOOGLE_CLIENTID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL
}