import express from 'express';
import { getMatchesByLeagueId } from '../../controllers/league/matchController/getMatchesByLeagueId';
import { getMatchById } from '../../controllers/league/matchController/getMatchById';
import { createMatch } from '../../controllers/league/matchController/createMatch';
import { updateMatchResult } from '../../controllers/league/matchController/updateMatchResult';
import { validateJWT } from '../../middleware/auth';


const router = express.Router();

router.get('/league/:leagueId', validateJWT, getMatchesByLeagueId);
router.get('/:matchId', validateJWT, getMatchById);
router.post('/:leagueId/create-matches', validateJWT, createMatch);
router.put('/:matchId/result', validateJWT, updateMatchResult);

export default router;
