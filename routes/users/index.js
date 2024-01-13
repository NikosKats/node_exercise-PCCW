const express = require('express');
const sequelize = require('../../utils/database');
const router = express.Router();
const { User } = require('../../models/UserModel');

router.get('/', (req, res) => {
    res.send({ message: "Users routes" })
})

// Answer to : ·Using sequelize (postgre configuration), connect with Database.
router.get('/check-database', async (req, res) => {
    try {
        sequelize.authenticate()
            .then(() => console.log('Connection has been established successfully.'))
            .catch(err => console.error('Unable to connect to the database:', err));

        res.status(200).send({ message: "Database connection success", })

    } catch (err) {
        console.log("🚀 ~ router.get ~ err:", err)
        res.status(500).send("Database Connection Error")
    };
})

/* Answer to : · Create an API endpoint in order to serve the retrieval of users based on a set of parameters. */
router.get('/all', async (req, res) => {
    try {

        const { name, email, dateOfBirth, gender, username } = req.query;

        let queryConditions = {};
        
        if (name) queryConditions.name = name;
        if (email) queryConditions.email = email;
        if (dateOfBirth) queryConditions.dateOfBirth = dateOfBirth;
        if (gender) queryConditions.gender = gender;
        if (username) queryConditions.username = username;

        const users = await User.findAll({
            where: queryConditions /* If queryConditions is an empty object (i.e., no query parameters were provided), findAll will return all users. */
        });

        res.status(200).json(users);

    } catch (error) {
        console.log("🚀 ~ router.get ~ error:", error)
        res.status(500).send('Error retrieving users');
    }
})

module.exports = router;