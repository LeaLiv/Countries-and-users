require("dotenv").config();

exports.config={
    tokenSecret:process.env.JWT_SECRET_KEY,
    port:process.env.PORT,
    mongoConnectionString:process.env.MONGO_CONNECTION_STRING,
    dbName:process.env.DB_NAME

}