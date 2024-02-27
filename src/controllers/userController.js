const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");
const validationModule = require("../modules/validationModule");
const passwordHashModule = require("../modules/passwordHashModule");
const jwtModule = require("../modules/jwtModule");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const validationResult = validationModule.validateUserInput(
      firstName,
      lastName,
      password,
      email
    );

    if (!validationResult.isValid) {
      return res.status(400).json({ errors: validationResult.errors });
    }
    const bcryptSaltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

    const hashedPassword = await passwordHashModule.hashPassword(
      password,
      bcryptSaltRounds
    );

    const userData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    await userRepository
      .createUser(req, res, userData)
      .then((data) => {
        res.status(201).json({ message: "Sucessfully Resistered!.." });
      })
      .catch((err) => {
        if (err.name === "SequelizeUniqueConstraintError") {
          res.status(400).json({ error: "Email already registered" });
        } else {
          const { message } = error.errors[0];
          res.status(500).json({ error: message });
        }
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login Functionality
const login = async (req, res) => {
  const { email, password } = req.body;

  // Extract values from environment variables
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiry = process.env.JWT_EXPIRY;

  try {
    if (!email) return res.status(404).json({ error: "Email id is missing" });
    if (!password)
      return res.status(404).json({ error: "Password is missing" });

    // Find user by email
    const user = await userRepository.findUserByEmail(req, res, email);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "This email is not registered" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Unauthorized Access" });
    }

    // Generate JWT token
    const token = jwtModule.generateToken(user.id, jwtSecret, jwtExpiry);

    // Respond with token and userId
    res.json({
      message: "Login successful!..",
      data: { userId: user.id, token },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userRepository.findUserById(req, res, userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User details retrieved successfully", user });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  getUserDetails,
};
