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
