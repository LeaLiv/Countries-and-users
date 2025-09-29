const mongoose = require('mongoose');
require("dotenv").config();

main().catch(err => console.log(err));

async function main() {
  // mongoose.set('strictQuery' , false);
  const connectionString = process.env.MONGO_CONNECTION_STRING;
  await mongoose.connect(`${connectionString}ATIDA2025`);
  // await mongoose.connect('mongodb://127.0.0.1:27017/ATIDA2025');
  console.log("mongo connect started");
  // use await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test'); if your database has auth enabled
}
