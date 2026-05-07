const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Razorpay = require("razorpay");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ================= MongoDB =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    createAdmin();
  })
  .catch((err) => console.log(err));


// ================= MODELS =================

// USER
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
});
const User = mongoose.model("User", userSchema);

// COURSE
const courseSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
});
const Course = mongoose.model("Course", courseSchema);

// ENQUIRY
const enquirySchema = new mongoose.Schema({
  studentName: String,
  fatherName: String,
  contact: String,
  course: String,
  date: { type: Date, default: Date.now },
});
const Enquiry = mongoose.model("Enquiry", enquirySchema);

// ✅ MESSAGE MODEL (IMPORTANT: routes se pehle)
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model("Message", messageSchema);


// ================= CREATE ADMIN =================
const createAdmin = async () => {
  const adminEmail = "admin@gmail.com";

  const exist = await User.findOne({ email: adminEmail });

  if (!exist) {
    const hash = await bcrypt.hash("123456", 10);

    await User.create({
      email: adminEmail,
      password: hash,
      role: "admin",
    });

    console.log("Admin created ✅");
  }
};


// ================= AUTH =================
const auth = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "No token ❌" });

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token ❌" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only ❌" });
  }
  next();
};


// ================= AUTH API =================

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role });

  } catch {
    res.status(500).json({ message: "Server error ❌" });
  }
});


// ================= USERS =================
app.get("/api/admin/users", auth, adminOnly, async (req, res) => {
  const users = await User.find({}, { password: 0 });
  res.json(users);
});


// ================= COURSES =================

// ADD
app.post("/api/add-course", auth, adminOnly, async (req, res) => {
  await Course.create(req.body);
  res.json({ message: "Course Added ✅" });
});

// UPDATE
app.put("/api/update-course/:id", auth, adminOnly, async (req, res) => {
  await Course.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated ✅" });
});

// DELETE
app.delete("/api/delete-course/:id", auth, adminOnly, async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted ✅" });
});

// GET ALL
app.get("/api/courses", async (req, res) => {
  const courses = await Course.find().sort({ _id: -1 });
  res.json(courses);
});

// GET SINGLE COURSE
app.get("/api/courses/:id", async (req, res) => {

  try {

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found ❌",
      });
    }

    res.json(course);

  } catch (err) {

    res.status(500).json({
      message: "Server Error ❌",
    });
  }
});


// ================= CONTACT (MESSAGES) =================

// SAVE MESSAGE
app.post("/api/contact", async (req, res) => {
  try {
    await Message.create(req.body);
    res.json({ message: "Message Saved ✅" });
  } catch {
    res.status(500).json({ message: "Error ❌" });
  }
});

// GET ALL MESSAGES (ADMIN)
app.get("/api/messages", auth, adminOnly, async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

// DELETE MESSAGE
app.delete("/api/message/:id", auth, adminOnly, async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted ✅" });
});


// ================= ENQUIRY =================

// SUBMIT
app.post("/api/enquiry", async (req, res) => {
  try {
    await Enquiry.create(req.body);
    res.json({ message: "Enquiry Submitted ✅" });
  } catch {
    res.status(500).json({ message: "Error ❌" });
  }
});

// GET
app.get("/api/admin/enquiries", auth, adminOnly, async (req, res) => {
  const data = await Enquiry.find().sort({ date: -1 });
  res.json(data);
});


// ================= PAYMENT =================
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.post("/api/payment", async (req, res) => {
  const order = await razorpay.orders.create({
    amount: req.body.amount * 100,
    currency: "INR",
  });

  res.json(order);
});


// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});


// ================= START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} 🚀`);
});