const Job = require('../models/Job');
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




module.exports = { createJob };