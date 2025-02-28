const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Zod = require("zod");

const { UserModel } = require("../db");

const { JWT_USER_PASSWORD } = require("../config");

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const requireBody = Zod.object({
    email: Zod.string().min(3).max(100).email(),
    password: Zod.string()
      .min(5)
      .max(100)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
    firstName: Zod.string().min(3),
    lastName: Zod.string().min(3),
  });

  const parseDataWithSuccess = requireBody.safeParse(req.body);

  if (!parseDataWithSuccess.success) {
    return res.status(400).json({
      message: "Incorrect data format",
      error: parseDataWithSuccess.error.errors,
    });
  }

  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Use 10 rounds for better security

  try {
    await UserModel.create({ email, password: hashedPassword, firstName, lastName });
    res.status(201).json({ message: "You are signed up" });
  } catch (error) {
    return res.status(400).json({ message: "User already exists", error: error.message });
  }
});

userRouter.post("/signin", async function (req, res) {
  const requireBody = Zod.object({
    email: Zod.string().email(),
    password: Zod.string()
      .min(5)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
  });

  const parseDataWithSuccess = requireBody.safeParse(req.body);

  if (!parseDataWithSuccess.success) {
    return res.status(400).json({
      message: "Incorrect data format",
      error: parseDataWithSuccess.error.errors,
    });
  }

  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(403).json({
      message: "Incorrect credentials",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD, { expiresIn: "1h" }); // Added expiry for better security
    res.status(200).json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Invalid credentials",
    });
  }
});

module.exports = {
  userRouter
};
