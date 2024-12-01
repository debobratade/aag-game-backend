import express from 'express';
import { googleAuth, googleCallback } from '../controllers/oAuthCotroller/googleLogin';
import { facebookAuth, facebookCallback } from '../controllers/oAuthCotroller/facebookLogin';


const router = express.Router();

// Google OAuth
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

// Facebook OAuth 
router.get('/facebook', facebookAuth);
router.get('/facebook/callback', facebookCallback);
// Optionally handle failure routes 
router.get('/auth/facebook/failure', (req, res) => {
    res.status(401).json({ message: 'Facebook authentication failed' });
});

export default router;
