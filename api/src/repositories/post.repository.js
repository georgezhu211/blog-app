const { prisma } = require("../config/prisma");

exports.create = async (data) => {
  return prisma.post.create({ data });
};
