import * as express from 'express';
import { getSongs, getSongById, voteSong, shareSong } from '../controllers/songController';

const router = express.Router();

router.get('/', getSongs);
router.get('/:id', getSongById);
router.post('/:id/vote', voteSong);
router.post('/:id/share', shareSong);

export default router;
