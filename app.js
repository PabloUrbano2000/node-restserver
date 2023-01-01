const Server = require("./models/server");

const dotenv = require("dotenv");

dotenv.config();

const server = new Server();

server.listen();
