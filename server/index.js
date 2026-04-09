require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const savedPropertyRoutes = require("./routes/savedPropertyRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "RentBuddy backend is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/properties/:id/reviews", reviewRoutes);
app.use("/api/saved-properties", savedPropertyRoutes);
app.use("/api/inquiries", inquiryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});