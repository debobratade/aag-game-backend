import request from 'supertest';
import app from '../../../src/index'; 
import League from '../../models/league/leagueModel';
import Team from '../../models/league/teamModel';
import MatchModel from '../../models/league/matchModel';


jest.mock('../../../models/league/leagueModel');
jest.mock('../../../models/league/matchModel');
jest.mock('../../../models/league/teamModel');

describe('DELETE /deleteLeague/:id', () => {

  it('should return 404 if the league is not found', async () => {

    (League.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .delete('/api/leagues/1') 
      .send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('League not found');
  });

  it('should delete the league and its associated matches and teams', async () => {

    (League.findByPk as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Test League',
      destroy: jest.fn(), 
    });

 
    (MatchModel.destroy as jest.Mock).mockResolvedValue(1); 
    (Team.destroy as jest.Mock).mockResolvedValue(1); 
    const response = await request(app)
      .delete('/api/leagues/1') 
      .send();

    expect(response.status).toBe(204);
    expect(League.findByPk).toHaveBeenCalledWith('1');
    expect(MatchModel.destroy).toHaveBeenCalledWith({ where: { leagueId: '1' } });
    expect(Team.destroy).toHaveBeenCalledWith({ where: { leagueId: '1' } });
    expect(League.prototype.destroy).toHaveBeenCalled();
  });

  it('should return 500 if there is an error during deletion', async () => {
   
    (League.findByPk as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Test League',
      destroy: jest.fn(),
    });

    (MatchModel.destroy as jest.Mock).mockRejectedValue(new Error('Error deleting matches'));

    const response = await request(app)
      .delete('/api/leagues/1') 
      .send();

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error deleting matches');
  });
});
