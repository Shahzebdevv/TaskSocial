import "dotenv/config";
import connectDB from "./config/database.js";
import app from "./app.js";

const startServer = async () => {
  try {
    await connectDB();

    const port = process.env.PORT || 8000;
    const server = app.listen(port, () => {
      console.log(`Server is Running on : ${port}`);
    });

    server.on("error", (error) => {
      console.error("Server execution error:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

startServer();
