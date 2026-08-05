require("dotenv").config();

const express = require("express");
const connectDatabase = require("./config/database");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Basic server middleware only.
app.use(express.json());

async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
