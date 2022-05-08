import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { conflictError, notFoundError } from "../../src/utils/errorUtils";

describe("recommendationService for insert", () => {
  it("Should return conflict error when the recommendation name already exists", async () => {
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

describe("recommendationService for finding id", () => {
  it("Should throw an error for an inmvalid Id to be searched", async () => {
    console.log(`The connection URL is ${process.env.DATABASE_URL}`);

    jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

    expect(recommendationService.upvote(1)).rejects.toEqual(notFoundError());
    expect(recommendationService.downvote(1)).rejects.toEqual(notFoundError());
  });
});

describe("recommendationService call to delete recommendation", () => {
  it("Should call the remove the recommendation from the repository after getting five downvotes", async () => {
    const returnMock = {
      id: 1,
      name: "Falamansa - Xote dos Milagres",
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
      score: -6,
    };
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValue(returnMock);
    jest.spyOn(recommendationRepository, "find").mockResolvedValue(returnMock);
    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementation(() => Promise.resolve());

    await recommendationService.downvote(1);

    expect(recommendationRepository.remove).toHaveBeenCalledTimes(1);
  });
});
