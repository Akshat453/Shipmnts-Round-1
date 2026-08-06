require("dotenv").config();
const tierRouter=require("./Routes/tiersRoute")
const userRouter = require("./Routes/userRoutes")

const express = require("express");
const connectDatabase = require("./config/database");

const app = express();
const PORT = Number(process.env.PORT) || 5080;

app.use(express.json());

app.use("/tiers",tierRouter);
app.use("/users", userRouter);


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
