const User = require('../models/User');
const mongoose = require('mongoose');

const getUser = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports = { getUser };