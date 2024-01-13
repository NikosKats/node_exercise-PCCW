const express = require('express');
const db = require('../../utils/db');
const sequelize = require('../../utils/database');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({ message: "Users routes" })
})

router.get('/check-db', (req, res) => {
    try {
        const results = db.query('SELECT NOW()');
        console.log("🚀 ~ router.get ~ results:", results)
        res.status(200).send({message:"Database connection success",result:results.rows})

    } catch (error) {
        console.log("🚀 ~ router.get ~ error:", error)
        res.status(500).send("No Database Connection")
    }
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