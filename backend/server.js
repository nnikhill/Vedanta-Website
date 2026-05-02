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

// ================= USER =================
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
});

const User = mongoose.model("User", userSchema);

// ================= COURSE =================
const courseSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
});

const Course = mongoose.model("Course", courseSchema);

// ================= ENROLLMENT =================
const enrollmentSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  date: { type: Date, default: Date.now },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

// ================= CONTACT =================
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// ================= CREATE ADMIN =================
const createAdmin = async () => {
  const adminEmail = "admin@gmail.com";

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
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

  if (!token) return res.status(401).json({ message: "No token" });

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ================= ADMIN =================
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only ❌" });
  }
  next();
};

// ================= AUTH APIs =================
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hash });

    res.json({ message: "Signup success", userId: user._id });

  } catch {
    res.status(500).json({ message: "Error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret",
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role });

  } catch {
    res.status(500).json({ message: "Error" });
  }
});

// ================= COURSES =================
app.post("/api/add-course", auth, adminOnly, async (req, res) => {
  await Course.create(req.body);
  res.json({ message: "Course Added" });
});

app.get("/api/courses", async (req, res) => {
  const search = req.query.search || "";

  const courses = await Course.find({
    title: { $regex: search, $options: "i" },
  });

  res.json(courses);
});

app.get("/api/courses/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
});

app.put("/api/update-course/:id", auth, adminOnly, async (req, res) => {
  await Course.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});

app.delete("/api/delete-course/:id", auth, adminOnly, async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ================= ENROLL =================
app.post("/api/enroll", auth, async (req, res) => {
  const { courseId } = req.body;

  await Enrollment.create({
    userId: req.user.id,
    courseId,
  });

  res.json({ message: "Enrolled ✅" });
});

// ================= ADMIN USERS LIST 🔥 =================
app.get("/api/admin/users", auth, adminOnly, async (req, res) => {
  const users = await User.find({}, { password: 0 });
  res.json(users);
});

// ================= ADMIN ENROLLMENTS 🔥 =================
app.get("/api/admin/enrollments", auth, adminOnly, async (req, res) => {
  const enrollments = await Enrollment.find();

  const data = [];

  for (let e of enrollments) {
    const user = await User.findById(e.userId);
    const course = await Course.findById(e.courseId);

    data.push({
      _id: e._id,
      userEmail: user?.email,
      courseTitle: course?.title,
      date: e.date,
    });
  }

  res.json(data);
});

// ================= STATS =================
app.get("/api/admin/stats", auth, adminOnly, async (req, res) => {
  const users = await User.countDocuments();
  const courses = await Course.countDocuments();
  const enrollments = await Enrollment.countDocuments();

  res.json({ users, courses, enrollments });
});

// ================= CONTACT =================
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  await Contact.create({ name, email, message });

  res.json({ message: "Message sent" });
});

app.get("/api/admin/messages", auth, adminOnly, async (req, res) => {
  const messages = await Contact.find().sort({ date: -1 });
  res.json(messages);
});

// ================= PAYMENT =================
const razorpay = new Razorpay({
  key_id: "YOUR_KEY",
  key_secret: "YOUR_SECRET",
});

app.post("/api/payment", async (req, res) => {
  const order = await razorpay.orders.create({
    amount: req.body.amount * 100,
    currency: "INR",
  });

  res.json(order);
});

app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

// ================= START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});