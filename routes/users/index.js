const express = require('express');
const db = require('../../utils/db');
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

module.exports = router;