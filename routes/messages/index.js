const express = require('express');
const sequelize = require('../../utils/database');
const router = express.Router();
const { Message } = require('../../models/MessageModel');

router.get('/', (req, res) => {
    res.send({ message: "Messages routes" });
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

/* Answer to: ·Create an API endpoint (or use the existing one) 
that receives the user-ids of two users and retrieves all 
of the messages that they have exchanged, ordered by the most recent sent.
*/

router.get('/exchange', (req, res) => {
    const { userID1, userID2 } = req.query;
})

module.exports = router;