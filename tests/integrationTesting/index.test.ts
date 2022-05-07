import app from "../../src/app.js";
import { prisma } from "../../src/database";
import supertest from "supertest";

describe("POST /recommendations insert", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });
  it("When sent unvalid data format, should return code 422 and not go further the code implementations. There shall be no new items on the db", async () => {
    const data = {};
    const newRecommendation = await supertest(app)
      .post("/recommendations/")
      .send(data);
    const recommendations = await prisma.recommendation.findMany();

    expect(newRecommendation.status).toBe(422);
    expect(recommendations.length).toHaveLength(0);
  });

  it("When sent valid data format, should await for the service, send the data forward to create on repository and return code 201. There shall be one item on the db", async () => {
    const data = {
      name: "T-ara Roly-Poly",
      youtubeLink:
        "https://www.youtube.com/watch?v=8Z9RTdj93o8&list=RD8Z9RTdj93o8&start_radio=1",
    };
    const newRecommendation = await supertest(app)
      .post("/recommendations/")
      .send(data);
    const recommendations = await prisma.recommendation.findMany();

    expect(newRecommendation.status).toBe(201);
    expect(recommendations.length).toHaveLength(1);
  });
});

describe("POST /recommendations/:id/upvote", () => {
  // beforeEach(async () => {
  //   await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  // });
  afterAll(async () => {
    await prisma.$disconnect();
  });
  it("Should send an valid id on the route as an parameter and then the video related from the id should receive an upvote", async () => {
    const id = 1;
    const checkSeed = await prisma.recommendation.findMany();
    console.log(checkSeed);
    const previousScore = await prisma.recommendation.findFirst({
      where: { id: id },
    });
    const newUpvote = await supertest(app).post(
      `/recommendations/${id}/upvote`
    );
    const currentScore = await prisma.recommendation.findFirst({
      where: { id: id },
    });

    expect(newUpvote.status).toBe(200);
    expect(currentScore.score - previousScore.score).toBe(1);
  });
});
