const express = require("express");
const cors = require("cors");
const { authenticateToken } = require("./middleware/auth.middleware");

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Public routes
app.use("/auth", authRoutes);

// Protected routes
app.use("/api", authenticateToken);
app.use("/api/posts", postRoutes);

app.get("/api/me", (req, res) => res.json({ user: req.user }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Blog api - listening on port ${PORT}!`);
});
