const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/Token');
const Validornot = require('../Middlewear/Validornot');
const Autherization = require('../Middlewear/Autherization');
const User = require('../user');

// Register
router.post('/register', Validornot, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with the given email already exists
    const existingUser = await User.findOne({ where: { user_email: email } });

    if (existingUser) {
      return res.status(409).json('User already exists');
    }

    // Hash the password
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // Create new user
    const newUser = await User.create({
      user_name: name,
      user_email: email,
      user_password: hashedPassword,
    });

    // Generate JWT token
    const token = jwtGenerator(newUser.id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Login
router.post('/login', Validornot, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { user_email: email } });

    if (!user) {
      return res.status(401).json('Incorrect Email or Password');
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.user_password);

    if (!validPassword) {
      return res.status(401).json('Incorrect Email or Password');
    }

    // Generate JWT token
    const token = jwtGenerator(user.id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Verify Route
router.get('/is-verify', Autherization, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
