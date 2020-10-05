import express from 'express';
const router = express.Router();
import {notesController} from '../controllers/notesController.js';

router.get("/", notesController.showIndex.bind(notesController));
router.get("/new", notesController.createNote.bind(notesController));

export const noteRoutes = router;