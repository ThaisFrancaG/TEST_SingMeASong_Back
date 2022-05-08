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

async function multipleEntries() {
  await prisma.recommendation.createMany({
    data: [
      {
        name: "Video 1",
        youtubeLink: "https://www.youtube.com/watch?v=zVGmt7GsUW4",
      },
      {
        name: "Video 2",
        youtubeLink: "https://www.youtube.com/watch?v=zVGmt7GsUW4",
      },
      {
        name: "Video 3",
        youtubeLink: "https://www.youtube.com/watch?v=zVGmt7GsUW4",
      },
      {
        name: "Video 4",
        youtubeLink: "https://www.youtube.com/watch?v=zVGmt7GsUW4",
      },
      {
        name: "Video 5",
        youtubeLink: "https://www.youtube.com/watch?v=zVGmt7GsUW4",
      },
      {
        name: "Video 6",
        youtubeLink: "https://www.youtube.com/watch?v=zVGmt7GsUW4",
      },
      {
        name: "Video 7",
        youtubeLink: "https://www.youtube.com/watch?v=zVGmt7GsUW4",
      },
      {
        name: "Video 8",
        youtubeLink: "https://www.youtube.com/watch?v=zVGmt7GsUW4",
      },
      {
        name: "Video 9",
        youtubeLink: "https://www.youtube.com/watch?v=zVGmt7GsUW4",
      },
      {
        name: "Video 10",
        youtubeLink: "https://www.youtube.com/watch?v=zVGmt7GsUW4",
      },
      {
        name: "Video 11",
        youtubeLink: "https://www.youtube.com/watch?v=zVGmt7GsUW4",
      },
    ],
  });
}
export { toChangeScore, badScore, multipleEntries };
