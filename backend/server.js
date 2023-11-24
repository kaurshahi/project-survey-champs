import config from "./config/config.js";
import app from "./express.js";
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

    app.get("/", (req, res) => {
      res.json({ message: "Welcome to User application." });
    });

    app.listen(config.port, () => {
      console.info("Server started on port %s.", config.port);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

startServer();
