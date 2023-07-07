const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patient");
const jwtStrategy = require("./middlewares/jwtStrategy");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());

// Middleware
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

require("./middlewares/jwtStrategy")(passport);

// Routes
app.use("/auth", authRoutes);
app.use("/patient", patientRoutes)


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
