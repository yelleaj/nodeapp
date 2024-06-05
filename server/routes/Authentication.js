const router = require("express").Router();
const pool = require("../app");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/Token");
const Token = require("../utils/Token");
const Validornot = require("../Middlewear/Validornot");
const Autherization = require("../Middlewear/Autherization");

// registering

router.post("/register", Validornot, async (req, res) =>{
    try {
        
        //1. destructure the request.body(name,email,password)

        const {name, email, password} = req.body;



        //2. Check if user exist(if user exist throw error)


        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[
            email
        ]);

        if (user.rows.length !== 0) {
            return res.status(409).json("User already exist");
        }
        // res.json(user.rows);



        //3. bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt); 

        //4. enter the new user inside our database

        const newUser = await pool.query("INSERT INTO users(user_name, user_email,user_password)VALUES($1,$2,$3) RETURNING *",[name,email,bcryptPassword]);

        // res.json(newUser.rows[0]);

        //5. generating our jwt token

        const token = Token(newUser.rows[0].user_id);
        res.json({ token });




    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



//login route

router.post("/login", Validornot, async (req, res) => {
    try {


        //1. destructure the req.body

        const { email, password } = req.body;


        //2. Check if user doesn't exist (if not then we throw error)

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[
            email
        ]);

        if(user.rows.length === 0) {
            return res.status(401).json("Incorrect Email or Password");
        }

        //3. check if given password is same with database password

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        // console.log(validPassword);

        if(!validPassword) {
            return res.status(401).json("Incorrect Email or Password")
        }

        //4. give jwt token 

        const token = Token(user.rows[0].user_id);
        res.json({ token });
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/is-verify", Autherization, async (req, res) => {
    try {
        res.json(true); 
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;