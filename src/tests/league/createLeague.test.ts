import request from 'supertest';
import app from '../../../src/index'; 
import League from '../../models/league/leagueModel';



jest.mock('../../../models/league/leagueModel');

describe('POST /createLeague', () => {
  it('should return 400 if validation fails', async () => {
    const response = await request(app)
      .post('/create-league') 
      .send({}); 

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation error');
  });

  it('should return 400 if the league name already exists', async () => {
 
    (League.findOne as jest.Mock).mockResolvedValue({
      name: 'Test League',
      end_time: new Date('2024-12-31'),
      start_time: new Date('2024-01-01'),
    });

    const response = await request(app)
      .post('/create-league') 
      .send({
        name: 'Test League',
        start_time: '2024-05-01T00:00:00Z',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('A league named Test League is already scheduled from 2024-01-01T00:00:00.000Z to 2024-12-31T00:00:00.000Z.');
  });

  it('should create a new league and return 201', async () => {

    (League.findOne as jest.Mock).mockResolvedValue(null);
  
    (League.create as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'New League',
      start_time: '2024-01-01T00:00:00Z',
      end_time: '2024-12-31T00:00:00Z',
    });

    const response = await request(app)
      .post('/create-league') 
      .send({
        name: 'New League',
        start_time: '2024-01-01T00:00:00Z',
        end_time: '2024-12-31T00:00:00Z',
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('New League');
    expect(response.body.start_time).toBe('2024-01-01T00:00:00Z');
  });

  it('should return 500 if there is a server error', async () => {

    (League.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/create-league') 
      .send({
        name: 'Test League',
        start_time: '2024-05-01T00:00:00Z',
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Database error');
  });
});
