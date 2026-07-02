const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token.util");
const userRepository = require("../repositories/user.repository");

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.create({
    username,
    password: hashedPassword,
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

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  const token = generateToken(user);

  res.json({ token });
};
