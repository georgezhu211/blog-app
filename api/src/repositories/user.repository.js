const { prisma } = require("../config/prisma");

exports.create = async ({ username, password, role = "USER" }) => {
  return prisma.user.create({ data: { username, password, role } });
};

exports.findUnique = async (where) => {
  return prisma.user.findUnique({ where });
};
