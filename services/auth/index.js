const express = require("express");
const redis = require("redis");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRoutes = require("./routes/auth");

const app = express();
const redisClient = redis.createClient({ host: "redis", port: 6379 });

app.use(bodyParser.json());
app.use("/auth", authRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
