import { prisma } from "../../src/database.js";

async function toChangeScore() {
  await prisma.recommendation.upsert({
    where: { name: "Falamansa" },
    update: {},
    create: {
      name: "Falamansa",
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
    },
  });
}

export { toChangeScore };
