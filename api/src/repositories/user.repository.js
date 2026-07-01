const { prisma } = require("../config/prisma");

exports.create = async ({ username, password, role = "USER" }) => {
  const user = await prisma.user.create({ data: { username, password, role } });

  return user;
};
