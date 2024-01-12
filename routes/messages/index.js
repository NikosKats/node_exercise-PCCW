const express = require('express');
const db = require('../../utils/db');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send({message:"Messages routes"});
})

router.get('/check-db', async (req,res)=>{
    try{
        const result = await db.query('SELECT NOW()');
        res.status(200).send({message:"Database connection success",result:results.rows})

    }catch(err) {
        console.log("🚀 ~ router.get ~ err:", err)
        res.status(500).send("Database Connection Eror")
    };
})

module.exports = router;