const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Middleware for parsing JSON
app.use(express.json());

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
