const express = require('express');
const path = require('path');
const http = require('http');
const { routesInit } = require('./routes/config_routes')
require('./db/mongoConnect')
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, "public")))
console.log(__dirname );
app.use(express.json());


routesInit(app);
const server = http.createServer(app);

const port = process.env.PORT || "3008"
server.listen(port, () => console.log(`Listening on port ${port}`));