import { prisma } from "../src/database.js";

async function main() {
  await prisma.recommendation.upsert({
    where: { name: "Falamansa - Xote dos Milagres" },
    update: {},
    create: {
      name: "Falamansa - Xote dos Milagres",
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
