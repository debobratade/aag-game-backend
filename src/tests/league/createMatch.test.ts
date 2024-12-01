import request from 'supertest';
import app from '../../../src/index'; // Assuming your Express app is exported from index.js
import League from '../../models/league/leagueModel';
import Team from '../../models/league/teamModel';
import Match from '../../models/league/matchModel';



jest.mock('../../../models/league/leagueModel');
jest.mock('../../../models/league/teamModel');
jest.mock('../../../models/league/matchModel');
jest.mock('../../../validators/leagueMatchValidator', () => ({
  validateCreateMatch: {
    validate: jest.fn().mockReturnValue({ error: null }), // Assuming no validation error
  },
}));

describe('POST /createMatch/:leagueId', () => {

  it('should return 400 if the request body is invalid', async () => {
   
    const mockValidator = require('../../../validators/leagueMatchValidator').validateCreateMatch;
    mockValidator.validate.mockReturnValue({
      error: {
        details: [{ message: '"team1Id" is required' }],
      },
    });

    const response = await request(app)
      .post('/api/leagues/1/matches')
      .send({}); 

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation error');
    expect(response.body.details).toContain('"team1Id" is required');
  });

  it('should return 404 if the league is not found', async () => {
    (League.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post('/api/leagues/1/matches')
      .send({
        team1Id: 1,
        team2Id: 2,
        start_time: new Date(),
        end_time: new Date(),
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('League not found');
  });

  it('should return 404 if one or both teams are not found', async () => {
    (League.findByPk as jest.Mock).mockResolvedValue({ id: 1 });
    (Team.findByPk as jest.Mock).mockResolvedValueOnce({ id: 1 }); 
    (Team.findByPk as jest.Mock).mockResolvedValueOnce(null); 

    const response = await request(app)
      .post('/api/leagues/1/matches')
      .send({
        team1Id: 1,
        team2Id: 2,
        start_time: new Date(),
        end_time: new Date(),
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('One or both teams not found');
  });

  it('should return 400 if match times are invalid', async () => {

    (League.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      start_time: new Date('2024-01-01T00:00:00Z'),
      end_time: new Date('2024-01-01T23:59:59Z'),
    });

    const response = await request(app)
      .post('/api/leagues/1/matches')
      .send({
        team1Id: 1,
        team2Id: 2,
        start_time: new Date('2024-01-02T00:00:00Z'), 
        end_time: new Date('2024-01-02T01:00:00Z'),
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      `Match times must be within the league's start (2024-01-01T00:00:00.000Z) and end (2024-01-01T23:59:59.000Z) dates, and the start time must precede the end time.`
    );
  });

  it('should return 400 if there is an overlapping match', async () => {

    (League.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      start_time: new Date('2024-01-01T00:00:00Z'),
      end_time: new Date('2024-01-01T23:59:59Z'),
    });
    (Team.findByPk as jest.Mock).mockResolvedValueOnce({ id: 1 });
    (Team.findByPk as jest.Mock).mockResolvedValueOnce({ id: 2 });


    (Match.findOne as jest.Mock).mockResolvedValue({
      start_time: new Date('2024-01-01T10:00:00Z'),
      end_time: new Date('2024-01-01T11:00:00Z'),
    });

    const response = await request(app)
      .post('/api/leagues/1/matches')
      .send({
        team1Id: 1,
        team2Id: 2,
        start_time: new Date('2024-01-01T09:30:00Z'),
        end_time: new Date('2024-01-01T10:30:00Z'),
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'A match between the same teams already exists in the time frame (2024-01-01T10:00:00.000Z - 2024-01-01T11:00:00.000Z).'
    );
  });

  it('should successfully create a match', async () => {

    (League.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      start_time: new Date('2024-01-01T00:00:00Z'),
      end_time: new Date('2024-01-01T23:59:59Z'),
    });
    (Team.findByPk as jest.Mock).mockResolvedValueOnce({ id: 1 });
    (Team.findByPk as jest.Mock).mockResolvedValueOnce({ id: 2 });


    (Match.create as jest.Mock).mockResolvedValue({
      id: 1,
      leagueId: 1,
      team1Id: 1,
      team2Id: 2,
      start_time: new Date('2024-01-01T10:00:00Z'),
      end_time: new Date('2024-01-01T11:00:00Z'),
      result: null,
    });

    const response = await request(app)
      .post('/api/leagues/1/matches')
      .send({
        team1Id: 1,
        team2Id: 2,
        start_time: new Date('2024-01-01T10:00:00Z'),
        end_time: new Date('2024-01-01T11:00:00Z'),
        result: null,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.team1Id).toBe(1);
    expect(response.body.team2Id).toBe(2);
  });
});
