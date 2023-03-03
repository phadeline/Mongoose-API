const { connect, connection } = require("mongoose");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

connect("mongodb://localhost/socialNetwork", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
