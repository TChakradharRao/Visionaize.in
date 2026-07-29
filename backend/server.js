/* eslint-disable prettier/prettier */
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const contactRoute = require("./routes/contact");
const authRoute = require("./routes/auth");
const enquiriesRoute = require("./routes/enquiries");
const usersRoute = require("./routes/users");
const mappedFormsRoute = require("./routes/mapped-forms");
const columnsRoute = require("./routes/columns");
const statsRoute = require("./routes/stats");
const whoamiRoute = require("./routes/whoami");

const app = express();

/* ---------- CORS ---------- */
app.use(cors({
  origin: [
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:5173",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "ngrok-skip-browser-warning",
  ],
}));

app.use(express.json());
app.use(cookieParser());

/* ---------- Routes ---------- */
app.use("/api/auth", authRoute);
app.use("/api/public/contact", contactRoute);
app.use("/api/public/whitepaper", contactRoute);
app.use("/api/public/case-study", contactRoute);
app.use("/api/admin/enquiries", enquiriesRoute);
app.use("/api/admin/contact", enquiriesRoute);
app.use("/api/admin/users", usersRoute);
app.use("/api/admin/mapped-forms", mappedFormsRoute);
app.use("/api/admin/columns", columnsRoute);
app.use("/api/admin/stats", statsRoute);
app.use("/api/admin/whoami", whoamiRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});