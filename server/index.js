require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const savedPropertyRoutes = require("./routes/savedPropertyRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const userRoutes = require("./routes/userRoutes");
const { getReviewsByUser } = require("./controllers/reviewController");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

app.get("/", (req, res) => {
  res.json({ message: "RentBuddy backend is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/properties/:id/reviews", reviewRoutes);
app.use("/api/saved-properties", savedPropertyRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.get("/api/reviews/user/:userId", getReviewsByUser);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});