import { Router } from "express";
import { createTournament } from "../../controllers/tournament/tournamentCotroller/createTournament";
import { getTournaments } from "../../controllers/tournament/tournamentCotroller/getTournaments";
import { getTournamentById } from "../../controllers/tournament/tournamentCotroller/getTournamentById";
import { updateTournament } from "../../controllers/tournament/tournamentCotroller/updateTournament";
import { validateJWT } from "../../middleware/auth";
import { deleteTournament } from "../../controllers/tournament/tournamentCotroller/deleteTournament";
const router = Router();


router.post('/create-tournaments', validateJWT, createTournament);
router.get('/gettournaments', validateJWT, getTournaments);
router.get('/:id', validateJWT, getTournamentById);
router.put('/:id', validateJWT, updateTournament);
router.delete('/tournaments/:id', validateJWT, deleteTournament);

export default router;






