const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoURL = "mongodb+srv://Matheesha:Matheesha@cluster0.xqfraot.mongodb.net/";
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Schema and model
const cycleSchema = new mongoose.Schema({
  userId: String,
  startDate: Date,
  endDate: Date,
});

const Cycle = mongoose.model("Cycle", cycleSchema);

// API routes
app.post("/addCycle", async (req, res) => {
  const { userId, startDate, endDate } = req.body;
  try {
    const cycle = new Cycle({ userId, startDate, endDate });
    await cycle.save();
    res.status(201).send({ message: "Cycle data added successfully." });
  } catch (error) {
    res.status(400).send({ message: "Error adding cycle data", error });
  }
});

app.get("/getAverageCycle/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const cycles = await Cycle.find({ userId }).sort({ startDate: -1 }).limit(6);
    if (cycles.length < 6) {
      return res.status(400).send({ message: "Not enough data (need 6 months)." });
    }

    const durations = cycles.map(cycle => {
      const duration = (new Date(cycle.endDate) - new Date(cycle.startDate)) / (1000 * 3600 * 24);
      return duration;
    });

    const averageCycle = durations.reduce((sum, dur) => sum + dur, 0) / durations.length;
    const ovulationDay = Math.round(averageCycle / 2);
    const safePeriods = [
      { from: 1, to: ovulationDay - 4 },
      { from: ovulationDay + 4, to: averageCycle },
    ];

    res.status(200).send({ averageCycle, ovulationDay, safePeriods });
  } catch (error) {
    res.status(400).send({ message: "Error fetching cycle data", error });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//login 
// Add to your existing backend code
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Add some sample users for testing
const addSampleUsers = async () => {
  const existingUsers = await User.find();
  if (existingUsers.length === 0) {
    const users = [
      { username: "testuser1", password: "password1" },
      { username: "testuser2", password: "password2" },
    ];
    await User.insertMany(users);
    console.log("Sample users added.");
  }
};
addSampleUsers();

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    res.status(200).send({ userId: user._id, message: "Login successful" });
  } catch (error) {
    res.status(400).send({ message: "Error during login", error });
  }
});
