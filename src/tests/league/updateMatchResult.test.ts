import request from 'supertest';
import app from "../../../src/index"
import Match from '../../models/league/matchModel';


jest.mock("../../../models/league/matchModel");

describe("Update Match Result API", () => {
    let mockMatch: any;

    beforeEach(() => {
        mockMatch = {
            id: 1,
            result: null,
            save: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 400 if match ID is invalid", async () => {
        const res = await request(app)
            .put("/api/matches/invalid-id/result")
            .send({ result: "Team 1 Won" });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Invalid match ID format");
    });

    it("should return 400 if result is missing or invalid", async () => {
        const invalidResult = { result: "Invalid Result" };
        const res = await request(app)
            .put("/api/matches/1/result")
            .send(invalidResult);

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Validation error");
        expect(res.body.details).toContain("Result must be one of 'Team 1 Won', 'Team 2 Won', or 'Draw'.");
    });

    it("should return 404 if match is not found", async () => {
        (Match.findByPk as jest.Mock).mockResolvedValue(null);

        const res = await request(app)
            .put("/api/matches/1/result")
            .send({ result: "Team 1 Won" });

        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Match not found");
    });

    it("should return 200 and update the match result successfully", async () => {
        (Match.findByPk as jest.Mock).mockResolvedValue(mockMatch);
        (mockMatch.save as jest.Mock).mockResolvedValue(mockMatch);

        const res = await request(app)
            .put("/api/matches/1/result")
            .send({ result: "Team 1 Won" });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Match result updated successfully");
        expect(res.body.match.result).toBe("Team 1 Won");
        expect(mockMatch.save).toHaveBeenCalledTimes(1);
    });
});
