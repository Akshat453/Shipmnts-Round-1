const mongoose = require("mongoose");

async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  const connection = await mongoose.connect(process.env.MONGODB_URI);

  console.log(
    `MongoDB connected: ${connection.connection.host}/${connection.connection.name}`
  );
}

module.exports = connectDatabase;
