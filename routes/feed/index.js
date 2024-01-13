const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const { User } = require('../../models/UserModel');
const { Message } = require('../../models/MessageModel');
const seedsXlsxPath = 'seeds.xlsx';

router.post('/feedDB', async (req, res) => {
    try {
        // Read the Excel file
        const workbook = xlsx.readFile(seedsXlsxPath); 

        // Map data to models
        const usersSheet = workbook.Sheets['users'];
        const messagesSheet = workbook.Sheets['messages'];

        // Convert sheets to JSON
        const usersData = xlsx.utils.sheet_to_json(usersSheet);
        const messagesData = xlsx.utils.sheet_to_json(messagesSheet);

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