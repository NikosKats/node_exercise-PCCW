const express = require('express');
const { Sequelize, Op } = require('sequelize');
const sequelize = require('../../utils/database');
const router = express.Router();
const { Message } = require('../../models/MessageModel');

router.get('/', (req, res) => {
    res.send({ message: "Messages routes" });
})

router.get('/all', async (req, res) => {
    try {
       
        const messages = await Message.findAll();
 
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error retrieving messages:", error);
        res.status(500).send('Error retrieving messages');
    }
});



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

/* Answer to: ·Create an API endpoint (or use the existing one) 
that receives the user-ids of two users and retrieves all 
of the messages that they have exchanged, ordered by the most recent sent.
*/

router.get('/exchange', async (req, res) => {

    try {

        const { userID1, userID2 } = req.query;

        if (!userID1 || !userID2) {
            return res.status(400).send('Both user IDs are required');
        }


        const messages = await Message.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { senderId: userID1, receiverId: userID2 },
                    { senderId: userID2, receiverId: userID1 }
                ]
            },
            order: [['timestampSent', 'DESC']] // Order by timestamp, most recent first
        });

        console.log("🚀 ~ router.get ~ messages:", messages)

        res.status(200).json(messages);

    } catch (error) {

        console.log("🚀 ~ router.get ~ error:", error)
        res.status(500).send('Error retrieving messages');
    }

})

// Delete all messages
router.delete('/delete', async (req, res) => {
    try {
        await Message.destroy({
            where: {},
            truncate: true // This option will truncate the table
        });

        res.status(200).send('All messages deleted successfully');
    } catch (error) {
        console.error('Error deleting all messages:', error);
        res.status(500).send('Error deleting all messages');
    }
});

module.exports = router;