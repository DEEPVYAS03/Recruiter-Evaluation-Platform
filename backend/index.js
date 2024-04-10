//imports
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();


// middlewares
app.use(cors())
app.use(express.json())



app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})


// importing routes 
// const routeName = require('./routes/routeName') 

const userRoutes = require('./routes/userRoutes')
const jobRoutes = require('./routes/jobRoutes')


//using of routes 
// (app.use('/api',routeName))

app.use('/api',userRoutes)
app.use('/api',jobRoutes)

// connecting to database

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('Database connected')
    })
    .catch((err)=>{
        console.log(err)
    })


// default route 

app.get('/',(req,res)=>{
    if(mongoose.connection.readyState === 1){
        res.status(200).json([
            {
                "status":"success",
                "code":200,
                "message":"Welcome to Resume Ranking System API",
                "database":"Connected to mongodb"
            }
        ])
    }
    else{
        res.status(200).json([
            {
                "status":"success",
                "code":200,
                "message":"Welcome to Resume Ranking System API",
                "database":"Not connected to mongodb"
            }
        ])
    }
})




// listening to server
app.listen(process.env.PORT,()=>{
    console.log('Server is running on port ',process.env.PORT)
})