import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { conflictError } from "../../src/utils/errorUtils";
describe("recommendationService", () => {
  it("Should return conflict error when the recommendation name already exists", async () => {
    console.log(`The connection URL is ${process.env.DATABASE_URL}`);
    const mockRecommendation = {
      id: 1,
      name: "Falamansa - Xote dos Milagres",
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
      score: 1,
    };

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValue(mockRecommendation);

    expect(
      recommendationService.insert({
        name: mockRecommendation.name,
        youtubeLink: mockRecommendation.youtubeLink,
      })
    ).rejects.toEqual(conflictError("Recommendations names must be unique"));
  });
});
