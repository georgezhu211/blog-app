const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  const user = await userRepository.create({
    username,
    password,
    role: "ADMIN",
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await userRepository.findUnique({ username });

  if (!user) {
    return res.status(400).json({ error: "Incorrect username" });
  }

  const match = user.password === password;

  if (!match) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
  );

  res.json({ token });
};
