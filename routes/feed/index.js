const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const sequelize = require('../../utils/database');

const { User } = require('../../models/UserModel');
const { Message } = require('../../models/MessageModel');
const seedsXlsxPath = 'seeds.xlsx';

 

router.get('/', (req, res) => {
    res.send({ message: "Feed routes" })
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

/* Answer to : · Create an API endpoint that when receives a POST request to the “/feedDB” route, 
 it feeds the database with data. Under the hood your endpoint reads the seed.odt 
 file and imports the data to the database.*/

router.post('/feedDB', async (req, res) => {
    try {
        // Read the Excel file
        const workbook = xlsx.readFile(seedsXlsxPath);

        // Map data to models
        const usersSheet = workbook.Sheets['users'];
        const messagesSheet = workbook.Sheets['messages'];

        // Convert sheets to JSON
        const usersData = xlsx.utils.sheet_to_json(usersSheet, { raw: false });
const messagesData = xlsx.utils.sheet_to_json(messagesSheet, { raw: false });

        // Import data into the database 
        for (const userData of usersData) {
            await User.create(userData);
        }
        for (const messageData of messagesData) { 
            await Message.create(messageData);
        }

        res.status(200).send('Database successfully seeded');
    } catch (error) {
        console.error('Error seeding database:', error);
        res.status(500).send('Error seeding database');
    }

});


module.exports = router;