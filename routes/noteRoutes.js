import express from 'express';
const router = express.Router();
import {notesController} from '../controllers/notesController.js';

router.get("/", notesController.showIndex.bind(notesController));
router.post("/", notesController.orderBy.bind(notesController));
router.get("/new", notesController.showCreateNote.bind(notesController));
router.post("/new", notesController.createNote.bind(notesController));

export const noteRoutes = router;