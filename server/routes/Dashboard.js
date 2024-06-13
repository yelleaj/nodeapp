const router = require("express").Router();
const User = require('../user');
const Autherization = require('../Middlewear/Autherization');
const Form = require('./form'); // Import the Form model

router.get("/", Autherization, async(req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.user },
            attributes: ['user_name']
        });
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post('/submit-form', async (req, res) => {
    const { fullName, countryCode, mobileNumber, gender, address1, address2 } = req.body;
    try {
        // Create a new form entry in the database
        const newForm = await Form.create({
            fullName,
            countryCode,
            mobileNumber,
            gender,
            address1,
            address2,
        });
        res.json(newForm);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
