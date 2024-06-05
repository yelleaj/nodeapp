const router = require("express").Router();
const pool = require("../app");
const Autherization = require('../Middlewear/Autherization');



router.get("/", Autherization, async(req, res) => {
    try {
        //req.user has the payload
        // res.json(req.user);

        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1",[req.user]);

        res.json(user.rows[0]);

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;