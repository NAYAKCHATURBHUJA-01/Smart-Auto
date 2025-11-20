const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data simulation
let solarPanels = [
  {
    id: "PANEL_1",
    efficiency: 92,
    dustLevel: 15,
    temperature: 45,
    powerOutput: 280,
    status: "optimal",
  },
  {
    id: "PANEL_2",
    efficiency: 78,
    dustLevel: 45,
    temperature: 48,
    powerOutput: 240,
    status: "warning",
  },
  {
    id: "PANEL_3",
    efficiency: 85,
    dustLevel: 25,
    temperature: 42,
    powerOutput: 265,
    status: "good",
  },
  {
    id: "PANEL_4",
    efficiency: 95,
    dustLevel: 8,
    temperature: 40,
    powerOutput: 290,
    status: "optimal",
  },
];

let cleaningRobot = {
  battery: 85,
  health: "Good",
  mode: "idle",
  location: "Panel 2",
  lastCleaned: "2024-01-15T10:30:00Z",
};

let alerts = [
  {
    id: 1,
    type: "warning",
    message: "Panel 2 efficiency dropped below 80%",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    type: "info",
    message: "Cleaning scheduled for Panel 2",
    timestamp: new Date().toISOString(),
  },
];

// Simulate data changes
setInterval(() => {
  // Update solar panel data
  solarPanels.forEach((panel) => {
    panel.efficiency = Math.max(
      60,
      Math.min(100, panel.efficiency + (Math.random() - 0.5) * 4)
    );
    panel.dustLevel = Math.max(
      0,
      Math.min(100, panel.dustLevel + (Math.random() - 0.5) * 6)
    );
    panel.temperature = Math.max(
      35,
      Math.min(60, panel.temperature + (Math.random() - 0.5) * 3)
    );
    panel.powerOutput = Math.round(panel.efficiency * 3 + Math.random() * 20);

    // Update status based on efficiency
    if (panel.efficiency >= 90) panel.status = "optimal";
    else if (panel.efficiency >= 80) panel.status = "good";
    else if (panel.efficiency >= 70) panel.status = "warning";
    else panel.status = "critical";
  });

  // Update robot data
  cleaningRobot.battery = Math.max(
    0,
    Math.min(100, cleaningRobot.battery + (Math.random() - 0.5) * 2)
  );

  // Generate new alerts occasionally
  if (Math.random() < 0.1) {
    const panel = solarPanels[Math.floor(Math.random() * solarPanels.length)];
    if (panel.efficiency < 75) {
      alerts.push({
        id: Date.now(),
        type: "critical",
        message: `Panel ${
          panel.id
        } efficiency critically low at ${panel.efficiency.toFixed(1)}%`,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Emit real-time updates
  io.emit("dataUpdate", {
    solarPanels,
    cleaningRobot,
    alerts: alerts.slice(-5), // Send last 5 alerts
  });
}, 3000);

// API Routes
app.get("/api/panels", (req, res) => {
  res.json(solarPanels);
});

app.get("/api/robot", (req, res) => {
  res.json(cleaningRobot);
});

app.get("/api/alerts", (req, res) => {
  res.json(alerts.slice(-10)); // Return last 10 alerts
});

app.get("/api/predict/:panelId", (req, res) => {
  const panelId = req.params.panelId;
  const panel = solarPanels.find((p) => p.id === panelId);

  if (!panel) {
    return res.status(404).json({ error: "Panel not found" });
  }

  // Simulate AI prediction
  const predictedEfficiency = Math.max(
    60,
    Math.min(100, panel.efficiency + (Math.random() - 0.5) * 10)
  );
  const recommendedAction =
    predictedEfficiency < 80
      ? "Clean soon"
      : predictedEfficiency < 70
      ? "Clean immediately"
      : "No action needed";

  res.json({
    panel_id: panelId,
    predicted_efficiency: Math.round(predictedEfficiency * 10) / 10,
    recommended_action: recommendedAction,
    battery_health: cleaningRobot.health,
    dust_level:
      panel.dustLevel > 40 ? "High" : panel.dustLevel > 20 ? "Moderate" : "Low",
    confidence: Math.round((0.7 + Math.random() * 0.3) * 100),
  });
});

app.post("/api/clean/:panelId", (req, res) => {
  const panelId = req.params.panelId;
  const panel = solarPanels.find((p) => p.id === panelId);

  if (!panel) {
    return res.status(404).json({ error: "Panel not found" });
  }

  // Simulate cleaning
  panel.dustLevel = Math.max(0, panel.dustLevel - 30);
  panel.efficiency = Math.min(100, panel.efficiency + 5);
  cleaningRobot.mode = "cleaning";
  cleaningRobot.location = panelId;
  cleaningRobot.battery = Math.max(0, cleaningRobot.battery - 15);

  alerts.push({
    id: Date.now(),
    type: "success",
    message: `Cleaning initiated for ${panelId}`,
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true, message: `Cleaning started for ${panelId}` });
});

app.get("/api/analytics", (req, res) => {
  // Generate dummy analytics data
  const now = new Date();
  const dailyData = [];

  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    dailyData.push({
      time: hour.toISOString(),
      efficiency: 80 + Math.random() * 15,
      dustLevel: 20 + Math.random() * 30,
      powerOutput: 250 + Math.random() * 50,
    });
  }

  res.json({
    dailyTrends: dailyData,
    totalPanels: solarPanels.length,
    averageEfficiency:
      solarPanels.reduce((sum, p) => sum + p.efficiency, 0) /
      solarPanels.length,
    totalPowerOutput: solarPanels.reduce((sum, p) => sum + p.powerOutput, 0),
  });
});

// Authentication routes (dummy)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Dummy authentication
  if (email === "admin@solar.com" && password === "admin123") {
    res.json({
      success: true,
      user: {
        id: 1,
        email: "admin@solar.com",
        name: "Solar Admin",
        role: "admin",
      },
      token: "dummy-jwt-token",
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.post("/api/auth/register", (req, res) => {
  const { email, password, name } = req.body;

  // Dummy registration
  res.json({
    success: true,
    user: {
      id: Date.now(),
      email,
      name,
      role: "user",
    },
    token: "dummy-jwt-token",
  });
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
