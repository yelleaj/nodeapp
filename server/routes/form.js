const router = require('express').Router();
const SubmitForm = require('../app'); // Import your Sequelize model for form submissions

// Define the route to handle form submissions
router.post('/submit-form', async (req, res) => {
  const { fullName, countryCode, mobileNumber, gender, address1, address2 } = req.body;

  try {
    // Create a new form entry in the database
    const newForm = await SubmitForm.create({
      fullName,
      countryCode,
      mobileNumber,
      gender,
      address1,
      address2,
    });

    // Respond with the newly created form entry
    res.json(newForm);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
