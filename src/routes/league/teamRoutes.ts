import express from 'express';
import { getTeamsByLeagueId } from '../../controllers/league/teamController/getTeamsByLeagueId';
import { getTeamById } from '../../controllers/league/teamController/getTeamById';
import { createTeam } from '../../controllers/league/teamController/createTeam';
import { getTeamsByUserId } from '../../controllers/league/teamController/getTeamsByUserId';
import { validateJWT } from '../../middleware/auth';

const router = express.Router();

router.get('/:leagueId/get-teams', validateJWT, getTeamsByLeagueId);
router.get('/:teamId', validateJWT, getTeamById);
router.post('/:leagueId/create-teams', validateJWT, createTeam);
router.get('/user/:userId', validateJWT, getTeamsByUserId);

export default router;
