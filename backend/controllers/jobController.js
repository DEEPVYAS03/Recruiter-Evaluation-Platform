const Job = require('../models/Job');
const User = require('../models/User');
const mongoose = require('mongoose');

const createJob = async (req, res) => {
    try{
        const {company,jobProfile,salary,lastDate} =req.body;
        const jdFile = req.file.path;

        const newJob = new Job({
            company,
            jobProfile,
            salary,
            lastDate,
            jdFile
        })

        await newJob.save();
        res.status(201).json({message:'Job created successfully',job:newJob});
    }
    catch(error){
        res.status(500).json({message:error.message});
    } 
}

const getJobs = async (req, res) => {
    try{
        const jobs = await Job.find();
        res.status(200).json(jobs);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

const applyJob = async (req, res) => {
    try{
        const {jobId, email} = req.body;
        const job = await Job.findById(jobId);
        const user = await User.find({email:email});
        job.appliedCandidates.push(user[0]._id);
        await job.save();

        res.status(200).json({job});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}


const getAppliedCandidates = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId).populate({
            path: 'appliedCandidates',
            model: 'User' // Reference to the User model
        });
        res.status(200).json(job.appliedCandidates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createJob, getJobs ,applyJob ,getAppliedCandidates};