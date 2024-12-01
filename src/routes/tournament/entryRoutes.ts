import express, { Request, Response } from 'express';
import { enterTournament } from '../../controllers/tournament/entryController/enterTournament';
import { getUserEntries } from '../../controllers/tournament/entryController/getUserEntries';
import { updateEntryStatus } from '../../controllers/tournament/entryController/updateEntryStatus';
import { validateJWT } from '../../middleware/auth';


const router = express.Router();

// Apply validation middleware to your route
router.post('/tournament/:tournamentId/enter', validateJWT, enterTournament);
router.get('/user/:userId/entries', validateJWT, getUserEntries);
router.put('/entries/:entryId/status', validateJWT, updateEntryStatus);

export default router;
