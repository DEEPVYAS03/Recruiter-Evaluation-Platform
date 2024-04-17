const mongoose = require('mongoose');
const Jobdata = require('../models/JobModel');

const postJobs = async (req, res) => {
    const { title, skills, location, salary, description } = req.body;
    const newJob = new Jobdata({ title, skills, location, salary, description });
    try {
        await newJob.save();
        res.status(200).json(newJob);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

module.exports = { postJobs };