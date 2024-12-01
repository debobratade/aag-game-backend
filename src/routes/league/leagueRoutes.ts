import express from 'express';
import { getLeagues } from '../../controllers/league/leagueController/getLeagues';
import { getLeagueById } from '../../controllers/league/leagueController/getLeagueById';
import { createLeague } from '../../controllers/league/leagueController/createLeague';
import { updateLeague } from '../../controllers/league/leagueController/updateLeague';
import { deleteLeague } from '../../controllers/league/leagueController/deleteLeague';
import { validateJWT } from '../../middleware/auth';


const router = express.Router();

router.get('/get-leagues', validateJWT, getLeagues);
router.get('/:id', validateJWT, getLeagueById);
router.post('/create-leagues', validateJWT, createLeague);
router.put('/update-leagues/:id', validateJWT, updateLeague);
router.delete('/delete-leagues/:id', validateJWT, deleteLeague);

export default router;
