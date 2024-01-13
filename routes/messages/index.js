const express = require('express');
const db = require('../../utils/db');
const sequelize = require('../../utils/database');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({ message: "Messages routes" });
})

router.get('/check-db', async (req, res) => {
    try {
        const results = await db.query('SELECT NOW()');

        res.status(200).send({ message: "Database connection success", result: results.rows })

    } catch (err) {
        console.log("🚀 ~ router.get ~ err:", err)
        res.status(500).send("Database Connection Eror")
    };
})

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

module.exports = router;