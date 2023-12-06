import config from "./config/config.js";
import app from "./app.js";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const startServer = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "survey-champs",
    });
    console.log("Connected to the database!");

    app.listen(config.port, () => {
      console.info("Server started on port %s.", config.port);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

startServer();
