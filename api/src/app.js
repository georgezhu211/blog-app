const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const { authenticateToken } = require("./middleware/auth.middleware");

const app = express();

app.use(cors());
app.use(express.json());

// Public routes
app.use("/auth", authRoutes);

// Protected routes (require valid JWT)
app.use("/api", authenticateToken);

app.get("/api/me", (req, res) => res.json({ user: req.user }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Blog api - listening on port ${PORT}!`);
});
