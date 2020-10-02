import express from 'express';
const router = express.Router();
import {notesController} from '../controllers/notesController.js';

router.get("/", notesController.showIndex.bind(notesController));

export const noteRoutes = router;