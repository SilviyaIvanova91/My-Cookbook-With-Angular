const config = require("./config");
const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

module.exports = () => {
  console.log("Connecting to:", config.dbURL);
  return mongoose.connect(config.dbURL, { family: 4 });
};
