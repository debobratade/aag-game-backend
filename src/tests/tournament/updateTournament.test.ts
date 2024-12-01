import request from 'supertest';
import  app  from '../../../src/index';  
import Tournament from '../../models/tournament/tournamentModel';

jest.mock("../../../models/tournament/tournamentModel");

describe("Update Tournament API", () => {
  let mockTournament: any;

  beforeEach(() => {
    mockTournament = {
      id: "1",
      name: "Sample Tournament",
      start_time: "2024-12-05T10:00:00Z",
      end_time: "2024-12-06T10:00:00Z",
      description: "Sample description",
      entry_fee: 100,
      prize_distribution: "50%-30%-20%",
      update: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if validation fails", async () => {
    const invalidData = {
      name: "", 
      start_time: "2024-12-05T10:00:00Z",
      end_time: "2024-12-06T10:00:00Z",
    };

    const res = await request(app)
      .put("/api/tournaments/1")
      .send(invalidData);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation errors");
    expect(res.body.details).toContain("name is not allowed to be empty");
  });

  it("should return 400 if start_time is in the past", async () => {
    const invalidData = {
      name: "Updated Tournament",
      start_time: "2023-12-05T10:00:00Z",  
      end_time: "2024-12-06T10:00:00Z",
    };

    const res = await request(app)
      .put("/api/tournaments/1")
      .send(invalidData);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Start time cannot be in the past");
  });

  it("should return 400 if end_time is in the past", async () => {
    const invalidData = {
      name: "Updated Tournament",
      start_time: "2024-12-05T10:00:00Z",
      end_time: "2023-12-06T10:00:00Z",  
    };

    const res = await request(app)
      .put("/api/tournaments/1")
      .send(invalidData);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("End time cannot be in the past");
  });

  it("should return 400 if end_time is before start_time", async () => {
    const invalidData = {
      name: "Updated Tournament",
      start_time: "2024-12-05T10:00:00Z",
      end_time: "2024-12-04T10:00:00Z",  
    };

    const res = await request(app)
      .put("/api/tournaments/1")
      .send(invalidData);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("End time must be greater than start time");
  });

  it("should return 404 if tournament with the given ID is not found", async () => {
    (Tournament.findByPk as jest.Mock).mockResolvedValue(null); 

    const validData = {
      name: "Updated Tournament",
      start_time: "2024-12-05T10:00:00Z",
      end_time: "2024-12-06T10:00:00Z",
    };

    const res = await request(app)
      .put("/api/tournaments/1")
      .send(validData);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Tournament with ID 1 not found");
  });

  it("should successfully update the tournament", async () => {
    (Tournament.findByPk as jest.Mock).mockResolvedValue(mockTournament);  
    (mockTournament.update as jest.Mock).mockResolvedValue(mockTournament);  

    const validData = {
      name: "Updated Tournament",
      start_time: "2024-12-05T10:00:00Z",
      end_time: "2024-12-06T10:00:00Z",
      description: "Updated description",
      entry_fee: 200,
      prize_distribution: "60%-30%-10%",
    };

    const res = await request(app)
      .put("/api/tournaments/1")
      .send(validData);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Tournament updated successfully");
    expect(res.body.tournament.name).toBe("Updated Tournament");
    expect(res.body.tournament.entry_fee).toBe(200);
  });

  it("should return 500 if there is an error updating the tournament", async () => {
    (Tournament.findByPk as jest.Mock).mockResolvedValue(mockTournament);
    (mockTournament.update as jest.Mock).mockRejectedValue(new Error("Database error")); 

    const validData = {
      name: "Updated Tournament",
      start_time: "2024-12-05T10:00:00Z",
      end_time: "2024-12-06T10:00:00Z",
    };

    const res = await request(app)
      .put("/api/tournaments/1")
      .send(validData);

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("An error occurred while updating the tournament");
  });
});
