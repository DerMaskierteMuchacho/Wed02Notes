const express = require('express');
const router = express.Router();
const notes = require('../controller/notesController.js');

router.get("/", notes.showIndex);

module.exports = router;