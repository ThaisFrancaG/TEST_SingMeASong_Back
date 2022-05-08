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

async function badScore() {
  await prisma.recommendation.upsert({
    where: { name: "Mama Hun" },
    update: {},
    create: {
      name: "Mama Hun",
      youtubeLink: "https://www.youtube.com/watch?v=zVGmt7GsUW4",
      score: -5,
    },
  });
}
export { toChangeScore, badScore };
