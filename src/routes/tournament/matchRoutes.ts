import express from 'express';
import { createTournamentMatch } from '../../controllers/tournament/tournamentMatchController/createTournamentMatch';
import { updateMatchResult } from '../../controllers/tournament/tournamentMatchController/updateMatchResult ';
import { validateJWT } from '../../middleware/auth';
import { matchmake } from '../../controllers/tournament/tournamentMatchController/matchmake';


const router = express.Router();

router.post('/tournaments/:tournamentId/matches', validateJWT, createTournamentMatch);
router.put('/tournament/:matchId/result', validateJWT, updateMatchResult);
router.post('/tournament/matchmake', matchmake) 
export default router;
