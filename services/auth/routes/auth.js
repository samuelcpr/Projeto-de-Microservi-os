const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Mocked DB (Substitua pelo PostgreSQL)
const users = [
  {
    username: "test",
    password: bcrypt.hashSync("password", 10),
    email: "test@example.com",
  },
];

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username || u.email === username
  );

  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado." });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Credenciais incorretas." });
  }

  // Gerar JWT
  const token = jwt.sign({ id: user.username }, "secret", { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
