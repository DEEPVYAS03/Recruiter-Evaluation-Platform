const express = require('express');
const router = express.Router();

const { postJobs } = require('../controller/JobController');

router.post('/postJobs', postJobs);

module.exports = router;