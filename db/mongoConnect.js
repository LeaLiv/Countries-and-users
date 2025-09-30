const mongoose = require('mongoose');
const { config } = require('../config/secret');

main().catch(err => console.log(err));

async function main() {
  // mongoose.set('strictQuery' , false);
  const connectionString = config.mongoConnectionString;
  const db_name=config.dbName;
  await mongoose.connect(`${connectionString}${db_name}`);
  // await mongoose.connect('mongodb://127.0.0.1:27017/ATIDA2025');
  console.log("mongo connect started");
  // use await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test'); if your database has auth enabled
}
