const express = require('express');
const app = express();
const cors = require('cors');
const {mongoose,connectToDatabase}=require('./db')
connectToDatabase();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use('/jobs', require('./routes/JobRoute'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);