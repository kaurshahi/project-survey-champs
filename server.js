import express from "express";
const app = express();
const { PORT = 3000 } = process.env;
app.get("/*", (req, res) => {
  res.json({ hello: "world" });
});
app.listen(PORT, () => {
  console.log(`App running in port ${PORT}`);
});
