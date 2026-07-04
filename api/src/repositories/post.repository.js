const { prisma } = require("../config/prisma");

exports.create = async (data) => {
  return prisma.post.create({ data });
};

exports.findByAuthor = async (authorId) => {
  return prisma.post.findMany({
    where: { authorId },
    orderBy: { createdAt: "desc" },
  });
};
