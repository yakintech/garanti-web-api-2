const express = require('express');
const router = express.Router();
const cleanupController = require('../controllers/cleanupController');

router.delete('/cleanup', cleanupController.cleanupDatabase);

module.exports = router;