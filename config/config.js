const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    "mongodb+srv://kaurshahi1:77syE1sIq9KUGw1B@cluster0.51jxpch.mongodb.net/?retryWrites=true&w=majority",
};
export default config;
