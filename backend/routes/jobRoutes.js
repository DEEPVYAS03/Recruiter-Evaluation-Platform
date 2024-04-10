const express = require('express');
const router = express.Router();
const {createJob, getJobs, applyJob, getAppliedCandidates} = require('../controllers/jobController');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/src/uploads/')
    },

    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})


router.post('/jobpost', upload.single('jdFile'), createJob)

router.get('/getjobs', getJobs)

router.put('/applyjob', applyJob)

router.get('/getappliedcandidates/:jobId', getAppliedCandidates)


module.exports = router;