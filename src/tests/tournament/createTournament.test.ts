import request from 'supertest';
import  app  from '../../../src/index';  
import Tournament from '../../models/tournament/tournamentModel';

jest.mock('../../../models/tournament/tournamentModel');

describe("Create Tournament API", () => {
  let mockTournament: any;

  beforeEach(() => {
    mockTournament = {
      name: "Sample Tournament",
      start_time: "2024-12-05T10:00:00Z",
      end_time: "2024-12-06T10:00:00Z",
      save: jest.fn(),
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
      .post("/api/tournaments")
      .send(invalidData);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation errors");
    expect(res.body.details).toContain("name is not allowed to be empty");
  });

  it("should return 400 if start_time is in the past", async () => {
    const invalidData = {
      name: "New Tournament",
      start_time: "2023-12-05T10:00:00Z", 
      end_time: "2023-12-06T10:00:00Z",
    };

    const res = await request(app)
      .post("/api/tournaments")
      .send(invalidData);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Start time cannot be in the past");
  });

  it("should return 400 if end_time is in the past", async () => {
    const invalidData = {
      name: "New Tournament",
      start_time: "2024-12-05T10:00:00Z",
      end_time: "2023-12-06T10:00:00Z",  
    };

    const res = await request(app)
      .post("/api/tournaments")
      .send(invalidData);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("End time cannot be in the past");
  });

  it("should return 400 if end_time is before start_time", async () => {
    const invalidData = {
      name: "New Tournament",
      start_time: "2024-12-05T10:00:00Z",
      end_time: "2024-12-04T10:00:00Z", 
    };

    const res = await request(app)
      .post("/api/tournaments")
      .send(invalidData);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("End time must be greater than start time");
  });

  it("should return 400 if tournament name conflicts with an existing tournament", async () => {
    (Tournament.findOne as jest.Mock).mockResolvedValue({
      name: "Existing Tournament",
      start_time: "2024-12-01T10:00:00Z",
      end_time: "2024-12-03T10:00:00Z",
    });

    const conflictingTournamentData = {
      name: "Existing Tournament",
      start_time: "2024-12-02T10:00:00Z",  
      end_time: "2024-12-04T10:00:00Z",
    };

    const res = await request(app)
      .post("/api/tournaments")
      .send(conflictingTournamentData);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("A tournament named Existing Tournament is already scheduled from 2024-12-01T10:00:00Z to 2024-12-03T10:00:00Z.");
  });

  it("should return 201 and create a new tournament successfully", async () => {
    (Tournament.create as jest.Mock).mockResolvedValue(mockTournament);

    const newTournamentData = {
      name: "New Tournament",
      start_time: "2024-12-05T10:00:00Z",
      end_time: "2024-12-06T10:00:00Z",
    };

    const res = await request(app)
      .post("/api/tournaments")
      .send(newTournamentData);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Tournament created successfully");
    expect(res.body.tournament.name).toBe("New Tournament");
  });
});
