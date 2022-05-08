import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import supertest from "supertest";
import {
  badScore,
  multipleEntries,
  toChangeScore,
} from "../factories/createFunctions.js";

describe("POST /recommendations insert", () => {
  beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });
  it("When sent unvalid data format, should return code 422 and not go further the code implementations. There shall be no new items on the db", async () => {
    const data = {};
    const newRecommendation = await supertest(app)
      .post("/recommendations")
      .send(data);
    const recommendations = await prisma.recommendation.findMany();
    expect(newRecommendation.status).toBe(422);
    expect(recommendations).toHaveLength(0);
  });

  it("When sent valid data format, should await for the service, send the data forward to create on repository and return code 201. There shall be one item on the db", async () => {
    const data = {
      name: "T-ara Roly-Poly",
      youtubeLink:
        "https://www.youtube.com/watch?v=8Z9RTdj93o8&list=RD8Z9RTdj93o8&start_radio=1",
    };
    const newRecommendation = await supertest(app)
      .post("/recommendations")
      .send(data);
    const recommendations = await prisma.recommendation.findMany();
    expect(newRecommendation.status).toBe(201);
    expect(recommendations).toHaveLength(1);
  });
});

describe("POST /recommendations/:id/upvote", () => {
  beforeAll(async () => {
    await toChangeScore();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });
  it("Should send an valid id on the route as an parameter and then the video related from the id should receive an upvote", async () => {
    const reference = await prisma.recommendation.findFirst({
      where: { name: "Falamansa" },
    });
    const id = reference.id;
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

describe("POST /recommendations/:id/downvote", () => {
  beforeAll(async () => {
    await toChangeScore();
    await badScore();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });
  it("Should send an valid id on the route as an parameter and then the video related from the id should receive an downvote", async () => {
    const reference = await prisma.recommendation.findFirst({
      where: { name: "Falamansa" },
    });
    const id = reference.id;

    const previousScore = await prisma.recommendation.findFirst({
      where: { id: id },
    });
    const newDownvote = await supertest(app).post(
      `/recommendations/${id}/downvote`
    );
    const currentScore = await prisma.recommendation.findFirst({
      where: { id: id },
    });

    expect(newDownvote.status).toBe(200);
    expect(previousScore.score - currentScore.score).toBe(1);
  });
  it("Should give a final downvote to a recommendation, which should be deleted", async () => {
    const reference = await prisma.recommendation.findFirst({
      where: { name: "Mama Hun" },
    });
    const id = reference.id;
    await supertest(app).post(`/recommendations/${id}/downvote`);
    const checkDeletion = await prisma.recommendation.findFirst({
      where: { id: id },
    });
    expect(checkDeletion).toBe(null);
  });
});

describe("GET /recommendations/?:id", () => {
  beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
    await multipleEntries();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Should send nothing but the request and receive a list of objects of maximun length 10 and status code 200", async () => {
    const recommendationsList = await supertest(app).get(`/recommendations/`);
    expect(recommendationsList.status).toBe(200);
    expect(recommendationsList.body.length).toBeLessThanOrEqual(10);
  });
  it("Should send an valid id on the requirements and receive one recommendation and status code 200", async () => {
    const recommendationItem = await prisma.recommendation.findFirst();

    const id = recommendationItem.id;
    const recommendationById = await supertest(app).get(
      `/recommendations/${id}`
    );

    expect(recommendationById.body).not.toBeNull();
    expect(recommendationById.status).toBe(200);
  });
});
