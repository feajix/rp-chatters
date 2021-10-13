import express, { Router } from 'express';
import { intervalsController } from '../controllers/intervlas';
import { timestampsController } from '../controllers/timestamps';

const router: Router = express.Router();

router.get('/intervals', intervalsController);
router.get('/timestamps', timestampsController);

export = router;
