const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.json({ message: "Access granted!" }));

app.use("/", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Blog api - listening on port ${PORT}!`);
});
