const express = require('express');
const { Op } = require('sequelize');
const sequelize = require('../../utils/database');
const router = express.Router();
const { User } = require('../../models/UserModel');
const { Message } = require('../../models/MessageModel');

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

        const { id, name, surname, dateOfBirth, gender, username } = req.query;

        let queryConditions = {};

        if (id) queryConditions.id = id;
        if (name) queryConditions.name = name;
        if (surname) queryConditions.surname = surname;
        if (dateOfBirth) queryConditions.dateOfBirth = dateOfBirth;
        if (gender) queryConditions.gender = gender;
        if (username) queryConditions.username = username;

        const users = await User.findAll({
            where: queryConditions /* If queryConditions is an empty object (i.e., no query parameters were provided), findAll will return all users. */
        });
        console.log("🚀 ~ router.get ~ queryConditions:", queryConditions)

        res.status(200).json(users);

    } catch (error) {
        console.log("🚀 ~ router.get ~ error:", error)
        res.status(500).send('Error retrieving users');
    }
})


/* Answer to : · Create an API endpoint that receives a user-id and then retrieves a list of users, 
sorted by the most recent message that has been exchanged between the user requested 
and the rest of the users (just like your social-media applications). 
In this requirement you might need to give us some instructions on how to run it. */
router.get('/sorted/:userID', async (req, res) => {
    try {
        const userID = req.params.userID;

        let latestMessages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderId: userID },
                    { receiverId: userID }
                ]
            },
            attributes: ['senderId', 'receiverId', [sequelize.fn('MAX', sequelize.col('timestampSent')), 'latestTimestamp']],
            group: [sequelize.col('senderId'), sequelize.col('receiverId')],
            raw: true
        });

        let uniqueuserIDs = new Set();
        latestMessages.forEach(message => {
            if (message.senderId !== userID) {
                uniqueuserIDs.add(message.senderId);
            }
            if (message.receiverId !== userID) {
                uniqueuserIDs.add(message.receiverId);
            }
        });
        uniqueuserIDs = Array.from(uniqueuserIDs);

        let userIDToLatestTimestamp = {};
        latestMessages.forEach(message => {
            const otheruserID = message.senderId === userID ? message.receiverId : message.senderId;
            userIDToLatestTimestamp[otheruserID] = message.latestTimestamp;
        });

        // Sort user IDs based on the latestTimestamp
        uniqueuserIDs.sort((a, b) => userIDToLatestTimestamp[b] - userIDToLatestTimestamp[a]);

        let sortedUsers = await Promise.all(
            uniqueuserIDs.map(async id => {
                return await User.findByPk(id);
            })
        );


        res.status(200).send({ sortedUsers });

    } catch (error) {
        console.log("🚀 ~ router.get ~ error:", error);
        res.status(500).send({ message: "Error ", error });
    }
})

// Delete all users
router.delete('/delete', async (req, res) => {
    try {
        await User.destroy({
            where: {},
            truncate: true // This option will truncate the table
        });

        res.status(200).send('All users deleted successfully');
    } catch (error) {
        console.error('Error deleting all users:', error);
        res.status(500).send('Error deleting all users');
    }
});

module.exports = router;