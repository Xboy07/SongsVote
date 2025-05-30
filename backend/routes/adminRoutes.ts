import * as express from 'express';
import { createSong, updateSong, deleteSong } from '../controllers/adminController';

const router = express.Router();

router.post('/songs', createSong);
router.put('/songs/:id', updateSong);
router.delete('/songs/:id', deleteSong);

export default router;
