import request from 'supertest';
import app  from '../../../src/index';  
import Tournament from '../../models/tournament/tournamentModel';
import Entry from '../../models/tournament/entryModel';
import MatchForTournament from '../../models/tournament/matchForTournamentModel';

jest.mock("../../../models/tournament/tournamentModel");
jest.mock("../../../models/tournament/entryModel");
jest.mock("../../../models/tournament/matchForTournamentModel");

describe("Create Tournament Match API", () => {
  let mockTournament: any;
  let mockTeam1: any;
  let mockTeam2: any;

  beforeEach(() => {
    mockTournament = {
      id: "1",
      name: "Sample Tournament",
      start_time: "2024-12-05T10:00:00Z",
      end_time: "2024-12-06T10:00:00Z",
    };

    mockTeam1 = {
      id: "1",
      status: "granted",
    };

    mockTeam2 = {
      id: "2",
      status: "granted",
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if the tournament ID is invalid", async () => {
    const res = await request(app)
      .post("/api/tournaments/invalidId/matches")
      .send({
        team1Id: "1",
        team2Id: "2",
        start_time: "2024-12-05T10:00:00Z",
        end_time: "2024-12-06T10:00:00Z",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('"tournamentId" must be a valid GUID');
  });

  it("should return 400 if the body is invalid", async () => {
    const res = await request(app)
      .post("/api/tournaments/1/matches")
      .send({
        team1Id: "1",
        team2Id: "",  
        start_time: "2024-12-05T10:00:00Z",
        end_time: "2024-12-06T10:00:00Z",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('"team2Id" is not allowed to be empty');
  });

  it("should return 404 if the tournament is not found", async () => {
    (Tournament.findByPk as jest.Mock).mockResolvedValue(null);  

    const res = await request(app)
      .post("/api/tournaments/1/matches")
      .send({
        team1Id: "1",
        team2Id: "2",
        start_time: "2024-12-05T10:00:00Z",
        end_time: "2024-12-06T10:00:00Z",
      });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Tournament not found");
  });

  it("should return 404 if team1 is not found", async () => {
    (Tournament.findByPk as jest.Mock).mockResolvedValue(mockTournament);
    (Entry.findByPk as jest.Mock).mockResolvedValue(null);  

    const res = await request(app)
      .post("/api/tournaments/1/matches")
      .send({
        team1Id: "1",
        team2Id: "2",
        start_time: "2024-12-05T10:00:00Z",
        end_time: "2024-12-06T10:00:00Z",
      });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Team 1 not found");
  });

  it("should return 404 if team2 is not found", async () => {
    (Tournament.findByPk as jest.Mock).mockResolvedValue(mockTournament);
    (Entry.findByPk as jest.Mock).mockResolvedValue(mockTeam1);  
    (Entry.findByPk as jest.Mock).mockResolvedValueOnce(null);

    const res = await request(app)
      .post("/api/tournaments/1/matches")
      .send({
        team1Id: "1",
        team2Id: "2",
        start_time: "2024-12-05T10:00:00Z",
        end_time: "2024-12-06T10:00:00Z",
      });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Team 2 not found");
  });

  it("should return 400 if team1 is not granted", async () => {
    const ungrantedTeam = { id: "1", status: "pending" };
    (Tournament.findByPk as jest.Mock).mockResolvedValue(mockTournament);
    (Entry.findByPk as jest.Mock).mockResolvedValue(ungrantedTeam);  

    const res = await request(app)
      .post("/api/tournaments/1/matches")
      .send({
        team1Id: "1",
        team2Id: "2",
        start_time: "2024-12-05T10:00:00Z",
        end_time: "2024-12-06T10:00:00Z",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Team 1 is not granted yet");
  });

  it("should return 400 if team2 is not granted", async () => {
    const ungrantedTeam = { id: "2", status: "pending" };
    (Tournament.findByPk as jest.Mock).mockResolvedValue(mockTournament);
    (Entry.findByPk as jest.Mock).mockResolvedValue(mockTeam1);  
    (Entry.findByPk as jest.Mock).mockResolvedValueOnce(ungrantedTeam);  

    const res = await request(app)
      .post("/api/tournaments/1/matches")
      .send({
        team1Id: "1",
        team2Id: "2",
        start_time: "2024-12-05T10:00:00Z",
        end_time: "2024-12-06T10:00:00Z",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Team 2 is not granted yet");
  });

  it("should successfully create a match", async () => {
    (Tournament.findByPk as jest.Mock).mockResolvedValue(mockTournament);
    (Entry.findByPk as jest.Mock).mockResolvedValue(mockTeam1);  
    (Entry.findByPk as jest.Mock).mockResolvedValueOnce(mockTeam2);

    const newMatch = {
      tournament_id: "1",
      team1_id: "1",
      team2_id: "2",
      start_time: "2024-12-05T10:00:00Z",
      end_time: "2024-12-06T10:00:00Z",
      status: "Pending",
    };

    (MatchForTournament.create as jest.Mock).mockResolvedValue(newMatch);

    const res = await request(app)
      .post("/api/tournaments/1/matches")
      .send({
        team1Id: "1",
        team2Id: "2",
        start_time: "2024-12-05T10:00:00Z",
        end_time: "2024-12-06T10:00:00Z",
      });

    expect(res.status).toBe(201);
    expect(res.body.tournament_id).toBe("1");
    expect(res.body.status).toBe("Pending");
  });

  it("should return 500 if there is an error creating the match", async () => {
    (Tournament.findByPk as jest.Mock).mockResolvedValue(mockTournament);
    (Entry.findByPk as jest.Mock).mockResolvedValue(mockTeam1);
    (Entry.findByPk as jest.Mock).mockResolvedValueOnce(mockTeam2);
    (MatchForTournament.create as jest.Mock).mockRejectedValue(new Error("Database error"));  

    const res = await request(app)
      .post("/api/tournaments/1/matches")
      .send({
        team1Id: "1",
        team2Id: "2",
        start_time: "2024-12-05T10:00:00Z",
        end_time: "2024-12-06T10:00:00Z",
      });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("An error occurred while creating the match.");
  });
});
