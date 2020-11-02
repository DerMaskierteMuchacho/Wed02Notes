// @ts-ignore
import express from 'express';
import {notesController} from "../controllers/notesController.js";
const router = express.Router();

router.get("/", notesController.showIndex.bind(notesController));
router.post("/", notesController.orderBy.bind(notesController));
router.get("/new", notesController.showCreateNote.bind(notesController));
router.post("/new", notesController.createNote.bind(notesController));
router.post("/edit", notesController.editNote.bind(notesController));

export const noteRoutes = router;