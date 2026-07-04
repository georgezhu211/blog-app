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

exports.findById = async (id) => {
  return prisma.post.findUnique({ where: { id } });
};

exports.update = async (id, data) => {
  return prisma.post.update({ where: { id }, data });
};

exports.remove = async (id) => {
  return prisma.post.delete({ where: { id } });
};
