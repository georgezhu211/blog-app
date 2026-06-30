const { prisma } = require("../src/config/prisma");
const bcrypt = require("bcryptjs");

async function main() {
  const hashedPassword = await bcrypt.hash("123123", 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin user seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
